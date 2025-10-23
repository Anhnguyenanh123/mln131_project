"use client";

import { useEffect, useRef } from "react";
import type * as PhaserType from "phaser";
import type { ExhibitData } from "@/types/museum";
import { museumData } from "@/data/museum-data";

interface MuseumSceneProps {
  onExhibitInteract: (exhibit: ExhibitData) => void;
  visitedExhibits: Set<string>;
  unlockedRooms: Set<number>;
  username: string;
}

export default function MuseumScene({
  onExhibitInteract,
  unlockedRooms,
  username,
}: MuseumSceneProps) {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserGameRef = useRef<Phaser.Game | null>(null);
  const initializedRef = useRef(false);
  const playerPositionRef = useRef<{ x: number; y: number }>({
    x: 150,
    y: 600,
  });

  useEffect(() => {
    if (!gameRef.current || phaserGameRef.current || initializedRef.current)
      return;
    initializedRef.current = true;

    let cancelled = false;

    let game: PhaserType.Game | null = null;

    (async () => {
      const Phaser = await import("phaser");
      if (cancelled) return;

      class MainScene extends Phaser.Scene {
        private player!: PhaserType.Physics.Arcade.Sprite;
        private playerNameText!: PhaserType.GameObjects.Text;
        private cursors!: PhaserType.Types.Input.Keyboard.CursorKeys;
        private wasd!: {
          W: PhaserType.Input.Keyboard.Key;
          A: PhaserType.Input.Keyboard.Key;
          S: PhaserType.Input.Keyboard.Key;
          D: PhaserType.Input.Keyboard.Key;
        };
        private exhibits: PhaserType.Physics.Arcade.Sprite[] = [];
        private nearExhibit: ExhibitData | null = null;
        private interactKey!: PhaserType.Input.Keyboard.Key;
        private promptText!: PhaserType.GameObjects.Text;
        private walls: PhaserType.GameObjects.Rectangle[] = [];
        private lockedDoors: PhaserType.GameObjects.Rectangle[] = [];

        constructor() {
          super({ key: "MainScene" });
        }

        preload() {
          this.load.spritesheet("player", "/sprites/Adam_run.png", {
            frameWidth: 16,
            frameHeight: 16,
          });

          this.createExhibitGraphics();
          this.createPlantGraphic();
          this.createBenchGraphic();
          this.createLockedDoorGraphic();
        }

        createExhibitGraphics() {
          const colors = [
            0x3b82f6, 0x8b5cf6, 0x06b6d4, 0x3b82f6, 0xef4444, 0xf97316,
            0xdc2626, 0xf59e0b, 0x10b981, 0x14b8a6, 0xf59e0b, 0x6366f1,
            0x8b5cf6, 0x06b6d4, 0x6366f1, 0xec4899, 0xf43f5e, 0xdb2777,
            0xec4899, 0x14b8a6, 0x06b6d4, 0x0891b2, 0x14b8a6, 0xa855f7,
            0x9333ea, 0x7c3aed, 0x64748b, 0x475569,
          ];

          museumData.forEach((exhibit, index) => {
            const graphics = this.make.graphics({ x: 0, y: 0 });

            graphics.fillStyle(0x8b7355, 1);
            graphics.fillRect(0, 0, 140, 160);

            if (exhibit.image) {
              graphics.fillStyle(colors[index], 1);
              graphics.fillRect(10, 10, 120, 120);
            } else {
              graphics.fillStyle(0xf5f5f5, 1);
              graphics.fillRect(10, 10, 120, 120);
              graphics.fillStyle(colors[index], 0.3);
              graphics.fillRect(10, 10, 120, 120);
            }

            graphics.fillStyle(0xf5f5f5, 1);
            graphics.fillRect(10, 135, 120, 20);

            graphics.generateTexture(`exhibit-${exhibit.id}`, 140, 160);
            graphics.destroy();
          });
        }

        createPlantGraphic() {
          const graphics = this.make.graphics({ x: 0, y: 0 });
          graphics.fillStyle(0x8b4513, 1);
          graphics.fillRect(8, 20, 24, 20);
          graphics.fillStyle(0x22c55e, 1);
          graphics.fillCircle(12, 15, 8);
          graphics.fillCircle(20, 12, 8);
          graphics.fillCircle(28, 15, 8);
          graphics.fillCircle(20, 20, 8);
          graphics.generateTexture("plant", 40, 40);
          graphics.destroy();
        }

        createBenchGraphic() {
          const graphics = this.make.graphics({ x: 0, y: 0 });
          graphics.fillStyle(0x8b4513, 1);
          graphics.fillRect(0, 10, 80, 20);
          graphics.fillStyle(0x654321, 1);
          graphics.fillRect(0, 0, 80, 10);
          graphics.generateTexture("bench", 80, 30);
          graphics.destroy();
        }

        createLockedDoorGraphic() {
          const graphics = this.make.graphics({ x: 0, y: 0 });
          graphics.fillStyle(0x7f1d1d, 1);
          graphics.fillRect(0, 0, 40, 200);
          graphics.fillStyle(0xfbbf24, 1);
          graphics.fillCircle(30, 100, 8);
          graphics.generateTexture("locked-door", 40, 200);
          graphics.destroy();
        }

        create() {
          this.physics.world.setBounds(0, 0, 9000, 1200);

          for (let x = 0; x < 9000; x += 120) {
            for (let y = 0; y < 1200; y += 120) {
              const baseColor = (x + y) % 240 === 0 ? 0x374151 : 0x2d3748;
              this.add.rectangle(x + 60, y + 60, 118, 118, baseColor);
            }
          }

          this.add.rectangle(4500, 100, 800, 80, 0x0f3460);
          this.add
            .text(4500, 100, "BẢO TÀNG KHOA HỌC CHÍNH TRỊ", {
              fontSize: "32px",
              color: "#e8e8e8",
              fontStyle: "bold",
            })
            .setOrigin(0.5);

          this.createWall(4500, 20, 9000, 40, 0x1e293b);
          this.createWall(4500, 1180, 9000, 40, 0x1e293b);
          this.createWall(20, 600, 40, 1200, 0x1e293b);
          this.createWall(8980, 600, 40, 1200, 0x1e293b);

          for (let i = 1; i <= 8; i++) {
            const x = i * 1000;

            this.createWall(x, 250, 40, 460, 0x1e293b);
            this.createWall(x, 950, 40, 460, 0x1e293b);

            if (!unlockedRooms.has(i + 1)) {
              const door = this.add.sprite(x, 600, "locked-door");

              const doorCollision = this.add.rectangle(
                x,
                600,
                40,
                200,
                0xff0000,
                0
              );
              this.physics.add.existing(doorCollision, true);
              this.lockedDoors.push(doorCollision);

              this.add
                .text(x, 500, `PHÒNG ${i + 1}\nĐANG KHÓA`, {
                  fontSize: "18px",
                  color: "#fbbf24",
                  fontStyle: "bold",
                  align: "center",
                })
                .setOrigin(0.5);
            }
          }

          for (let room = 0; room < 9; room++) {
            const baseX = room * 1000;
            this.createPillar(baseX + 250, 250);
            this.createPillar(baseX + 250, 950);
            this.createPillar(baseX + 450, 250);
            this.createPillar(baseX + 450, 950);
            this.createPillar(baseX + 650, 250);
            this.createPillar(baseX + 650, 950);

            this.addPlant(baseX + 180, 180);
            this.addPlant(baseX + 520, 180);
            this.addPlant(baseX + 720, 180);
            this.addPlant(baseX + 180, 1020);
            this.addPlant(baseX + 520, 1020);
            this.addPlant(baseX + 720, 1020);

            this.addBench(baseX + 350, 500);
            this.addBench(baseX + 550, 700);
          }

          museumData.forEach((exhibit) => {
            const exhibitSprite = this.physics.add.sprite(
              exhibit.position.x,
              exhibit.position.y,
              `exhibit-${exhibit.id}`
            );
            exhibitSprite.setImmovable(true);
            exhibitSprite.setData("exhibitData", exhibit);
            this.exhibits.push(exhibitSprite);

            const roomLabels = [
              "PHÒNG 1: KHỞI NGUỒN & NỀN TẢNG",
              "PHÒNG 2: BẢN CHẤT & HÌNH THỨC",
              "PHÒNG 3: NHÀ NƯỚC PHÁP QUYỀN",
              "PHÒNG 4: PHÁT HUY DÂN CHỦ",
              "PHÒNG 5: PHÒNG CHỐNG THAM NHŨNG",
              "PHÒNG 6: ĐỔI MỚI & CHUYỂN ĐỔI SỐ",
              "PHÒNG 7: TRÁCH NHIỆM CÔNG DÂN",
              "PHÒNG 8: ĐANG XÂY DỰNG",
              "PHÒNG 9: ĐANG XÂY DỰNG",
            ];

            this.add
              .text(
                exhibit.position.x,
                exhibit.position.y - 120,
                roomLabels[exhibit.roomNumber - 1],
                {
                  fontSize: "18px",
                  color: "#fbbf24",
                  fontStyle: "bold",
                }
              )
              .setOrigin(0.5);

            this.add
              .text(
                exhibit.position.x,
                exhibit.position.y + 100,
                exhibit.title,
                {
                  fontSize: "13px",
                  color: "#e8e8e8",
                  align: "center",
                  wordWrap: { width: 180 },
                }
              )
              .setOrigin(0.5);

            const spotlight = this.add.circle(
              exhibit.position.x,
              exhibit.position.y,
              120,
              0xffffff,
              0.1
            );
            this.tweens.add({
              targets: spotlight,
              alpha: 0.2,
              duration: 2000,
              yoyo: true,
              repeat: -1,
            });
          });

          this.player = this.physics.add.sprite(
            playerPositionRef.current.x,
            playerPositionRef.current.y,
            "player"
          );
          this.player.setCollideWorldBounds(true);
          this.player.setScale(2);

          this.anims.create({
            key: "walk-down",
            frames: this.anims.generateFrameNumbers("player", {
              start: 0,
              end: 2,
            }),
            frameRate: 8,
            repeat: -1,
          });

          this.anims.create({
            key: "walk-left",
            frames: this.anims.generateFrameNumbers("player", {
              start: 12,
              end: 14,
            }),
            frameRate: 8,
            repeat: -1,
          });

          this.anims.create({
            key: "walk-right",
            frames: this.anims.generateFrameNumbers("player", {
              start: 24,
              end: 26,
            }),
            frameRate: 8,
            repeat: -1,
          });

          this.anims.create({
            key: "walk-up",
            frames: this.anims.generateFrameNumbers("player", {
              start: 36,
              end: 38,
            }),
            frameRate: 8,
            repeat: -1,
          });

          this.anims.create({
            key: "idle-down",
            frames: [{ key: "player", frame: 1 }],
            frameRate: 1,
          });

          this.anims.create({
            key: "idle-left",
            frames: [{ key: "player", frame: 13 }],
            frameRate: 1,
          });

          this.anims.create({
            key: "idle-right",
            frames: [{ key: "player", frame: 25 }],
            frameRate: 1,
          });

          this.anims.create({
            key: "idle-up",
            frames: [{ key: "player", frame: 37 }],
            frameRate: 1,
          });

          this.player.anims.play("idle-down");

          this.playerNameText = this.add
            .text(this.player.x, this.player.y + 30, username, {
              fontSize: "14px",
              color: "#ffffff",
              backgroundColor: "#000000",
              padding: { x: 6, y: 3 },
            })
            .setOrigin(0.5);

          this.walls.forEach((wall) => {
            this.physics.add.collider(this.player, wall);
          });

          this.lockedDoors.forEach((door) => {
            this.physics.add.collider(this.player, door);
          });

          this.cameras.main.setBounds(0, 0, 9000, 1200);
          this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
          this.cameras.main.setZoom(1);

          this.cursors = this.input.keyboard!.createCursorKeys();
          this.wasd = {
            W: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            A: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            S: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            D: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D),
          };
          this.interactKey = this.input.keyboard!.addKey(
            Phaser.Input.Keyboard.KeyCodes.E
          );

          this.promptText = this.add
            .text(0, 0, "Nhấn E để xem nội dung", {
              fontSize: "18px",
              color: "#ffffff",
              backgroundColor: "#000000",
              padding: { x: 12, y: 6 },
            })
            .setOrigin(0.5)
            .setVisible(false)
            .setScrollFactor(0);

          this.exhibits.forEach((exhibit) => {
            this.physics.add.overlap(this.player, exhibit, () => {
              this.nearExhibit = exhibit.getData("exhibitData");
            });
          });

          this.interactKey.on("down", () => {
            if (this.nearExhibit) {
              window.handleExhibitInteract?.(this.nearExhibit);
            }
          });
        }

        createWall(
          x: number,
          y: number,
          width: number,
          height: number,
          color: number
        ) {
          const wall = this.add.rectangle(x, y, width, height, color);
          this.physics.add.existing(wall, true);
          this.walls.push(wall);
        }

        createPillar(x: number, y: number) {
          const pillar = this.add.rectangle(x, y, 60, 60, 0x1e293b);
          this.add.rectangle(x, y, 50, 50, 0x374151);
          this.physics.add.existing(pillar, true);
          this.walls.push(pillar);
        }

        addPlant(x: number, y: number) {
          this.add.sprite(x, y, "plant");
        }

        addBench(x: number, y: number) {
          this.add.sprite(x, y, "bench");
        }

        update() {
          let lastDirection = "down";
          if (this.player.anims.currentAnim) {
            const animKey = this.player.anims.currentAnim.key;
            if (animKey.includes("up")) lastDirection = "up";
            else if (animKey.includes("down")) lastDirection = "down";
            else if (animKey.includes("left")) lastDirection = "left";
            else if (animKey.includes("right")) lastDirection = "right";
          }

          this.player.setVelocity(0);

          const speed = 250;
          let isMoving = false;

          if (this.cursors.left.isDown || this.wasd.A.isDown) {
            this.player.setVelocityX(-speed);
            this.player.anims.play("walk-left", true);
            isMoving = true;
          } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
            this.player.setVelocityX(speed);
            this.player.anims.play("walk-right", true);
            isMoving = true;
          }

          if (this.cursors.up.isDown || this.wasd.W.isDown) {
            this.player.setVelocityY(-speed);
            if (!isMoving) {
              this.player.anims.play("walk-up", true);
            }
            isMoving = true;
          } else if (this.cursors.down.isDown || this.wasd.S.isDown) {
            this.player.setVelocityY(speed);
            if (!isMoving) {
              this.player.anims.play("walk-down", true);
            }
            isMoving = true;
          }

          if (!isMoving) {
            this.player.anims.play(`idle-${lastDirection}`, true);
          }

          this.playerNameText.setPosition(this.player.x, this.player.y + 30);
          this.playerNameText.setText(
            (window as any).currentUsername ?? username
          );

          this.nearExhibit = null;
          this.exhibits.forEach((exhibit) => {
            const distance = Phaser.Math.Distance.Between(
              this.player.x,
              this.player.y,
              exhibit.x,
              exhibit.y
            );
            if (distance < 150) {
              this.nearExhibit = exhibit.getData("exhibitData");
            }
          });

          if (this.nearExhibit) {
            this.promptText.setVisible(true);
            this.promptText.setPosition(
              this.cameras.main.width / 2,
              this.cameras.main.height - 60
            );
          } else {
            this.promptText.setVisible(false);
          }

          playerPositionRef.current = { x: this.player.x, y: this.player.y };

          window.dispatchEvent(
            new CustomEvent("playerMove", {
              detail: { x: this.player.x, y: this.player.y },
            })
          );
        }
      }

      const config: PhaserType.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        parent: gameRef.current!,
        width: window.innerWidth,
        height: window.innerHeight - 100,
        physics: {
          default: "arcade",
          arcade: {
            gravity: { x: 0, y: 0 },
            debug: false,
          },
        },
        scene: MainScene,
        backgroundColor: "#1a1a2e",
      };

      game = new Phaser.Game(config);
      phaserGameRef.current = game;

      (window as any).handleExhibitInteract = onExhibitInteract;
      (window as any).currentUsername = username;
    })();

    return () => {
      cancelled = true;
      phaserGameRef.current?.destroy(true);
      phaserGameRef.current = null;
      initializedRef.current = false;
    };
  }, []);

  useEffect(() => {
    (window as any).currentUsername = username;
  }, [username]);

  return <div ref={gameRef} className="w-full h-full" />;
}
