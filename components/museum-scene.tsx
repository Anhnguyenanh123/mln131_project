"use client";

import { useEffect, useRef } from "react";
import type * as PhaserType from "phaser";
import type { ExhibitData } from "@/types/museum";
import { museumData } from "@/data/museum-data";

interface MuseumSceneProps {
  onExhibitInteract: (exhibit: ExhibitData) => void;
  visitedExhibits: Set<string>;
}

export default function MuseumScene({
  onExhibitInteract,
  visitedExhibits,
}: MuseumSceneProps) {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserGameRef = useRef<PhaserType.Game | null>(null);

  useEffect(() => {
    if (!gameRef.current || phaserGameRef.current) return;

    let cancelled = false;

    const init = async () => {
      const Phaser = await import("phaser");

      class MainScene extends Phaser.Scene {
        private player!: Phaser.Physics.Arcade.Sprite;
        private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
        private wasd!: {
          W: Phaser.Input.Keyboard.Key;
          A: Phaser.Input.Keyboard.Key;
          S: Phaser.Input.Keyboard.Key;
          D: Phaser.Input.Keyboard.Key;
        };
        private exhibits: Phaser.Physics.Arcade.Sprite[] = [];
        private nearExhibit: ExhibitData | null = null;
        private interactKey!: Phaser.Input.Keyboard.Key;
        private promptText!: Phaser.GameObjects.Text;
        private walls: Phaser.GameObjects.Rectangle[] = [];

        constructor() {
          super({ key: "MainScene" });
        }

        preload() {
          this.load.image("player", "/public/sprites/character.jpg");
          this.createExhibitGraphics();
          this.createPlantGraphic();
          this.createBenchGraphic();
        }

        createExhibitGraphics() {
          const colors = [
            0x3b82f6, 0x8b5cf6, 0x06b6d4, 0xef4444, 0xf97316, 0xdc2626,
            0xf59e0b, 0x10b981, 0x14b8a6, 0x6366f1,
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

        create() {
          this.physics.world.setBounds(0, 0, 3800, 1200);

          for (let x = 0; x < 3800; x += 120) {
            for (let y = 0; y < 1200; y += 120) {
              const baseColor = (x + y) % 240 === 0 ? 0x374151 : 0x2d3748;
              this.add.rectangle(x + 60, y + 60, 118, 118, baseColor);
            }
          }

          this.add.rectangle(1900, 100, 600, 80, 0x0f3460);
          this.add
            .text(1900, 100, "BẢO TÀNG KHOA HỌC CHÍNH TRỊ", {
              fontSize: "32px",
              color: "#e8e8e8",
              fontStyle: "bold",
            })
            .setOrigin(0.5);

          this.createWall(1900, 20, 3800, 40, 0x1e293b);
          this.createWall(1900, 1180, 3800, 40, 0x1e293b);
          this.createWall(20, 600, 40, 1200, 0x1e293b);
          this.createWall(3780, 600, 40, 1200, 0x1e293b);

          this.createWall(900, 600, 40, 800, 0x1e293b);
          this.createWall(900, 250, 40, 300, 0x1e293b);
          this.createWall(900, 950, 40, 300, 0x1e293b);

          this.createWall(1800, 600, 40, 800, 0x1e293b);
          this.createWall(1800, 250, 40, 300, 0x1e293b);
          this.createWall(1800, 950, 40, 300, 0x1e293b);

          this.createWall(2800, 600, 40, 800, 0x1e293b);
          this.createWall(2800, 250, 40, 300, 0x1e293b);
          this.createWall(2800, 950, 40, 300, 0x1e293b);

          this.createPillar(250, 250);
          this.createPillar(250, 950);
          this.createPillar(450, 250);
          this.createPillar(450, 950);
          this.createPillar(650, 250);
          this.createPillar(650, 950);

          this.createPillar(1150, 250);
          this.createPillar(1150, 950);
          this.createPillar(1450, 250);
          this.createPillar(1450, 950);
          this.createPillar(1650, 250);
          this.createPillar(1650, 950);

          this.createPillar(2150, 250);
          this.createPillar(2150, 950);
          this.createPillar(2450, 250);
          this.createPillar(2450, 950);
          this.createPillar(2650, 250);
          this.createPillar(2650, 950);

          this.createPillar(3100, 400);
          this.createPillar(3100, 800);
          this.createPillar(3400, 400);
          this.createPillar(3400, 800);

          this.addPlant(180, 180);
          this.addPlant(520, 180);
          this.addPlant(720, 180);
          this.addPlant(180, 1020);
          this.addPlant(520, 1020);
          this.addPlant(720, 1020);

          this.addPlant(1080, 180);
          this.addPlant(1520, 180);
          this.addPlant(1720, 180);
          this.addPlant(1080, 1020);
          this.addPlant(1520, 1020);
          this.addPlant(1720, 1020);

          this.addPlant(2080, 180);
          this.addPlant(2520, 180);
          this.addPlant(2720, 180);
          this.addPlant(2080, 1020);
          this.addPlant(2520, 1020);
          this.addPlant(2720, 1020);

          this.addPlant(3000, 300);
          this.addPlant(3000, 900);
          this.addPlant(3600, 300);
          this.addPlant(3600, 900);

          this.addBench(350, 500);
          this.addBench(550, 700);
          this.addBench(1250, 500);
          this.addBench(1550, 700);
          this.addBench(2250, 500);
          this.addBench(2550, 700);
          this.addBench(3250, 600);

          museumData.forEach((exhibit, index) => {
            const exhibitSprite = this.physics.add.sprite(
              exhibit.position.x,
              exhibit.position.y,
              `exhibit-${exhibit.id}`
            );
            exhibitSprite.setImmovable(true);
            exhibitSprite.setData("exhibitData", exhibit);
            this.exhibits.push(exhibitSprite);

            let roomLabel = "";
            if (index < 3) roomLabel = "PHÒNG 1: DÂN CHỦ XHCN";
            else if (index < 6) roomLabel = "PHÒNG 2: NHÀ NƯỚC PHÁP QUYỀN";
            else if (index < 9) roomLabel = "PHÒNG 3: PHÁT HUY & XÂY DỰNG";
            else roomLabel = "TỔNG KẾT";

            this.add
              .text(exhibit.position.x, exhibit.position.y - 120, roomLabel, {
                fontSize: "20px",
                color: "#fbbf24",
                fontStyle: "bold",
              })
              .setOrigin(0.5);

            this.add
              .text(
                exhibit.position.x,
                exhibit.position.y + 100,
                exhibit.title,
                {
                  fontSize: "14px",
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

          this.player = this.physics.add.sprite(150, 600, "player");
          this.player.setScale(0.8);
          this.player.setCollideWorldBounds(true);

          this.walls.forEach((wall) => {
            this.physics.add.collider(this.player, wall);
          });

          this.cameras.main.setBounds(0, 0, 3800, 1200);
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
              // @ts-ignore
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
          this.player.setVelocity(0);

          const speed = 250;
          if (this.cursors.left.isDown || this.wasd.A.isDown) {
            this.player.setVelocityX(-speed);
          } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
            this.player.setVelocityX(speed);
          }

          if (this.cursors.up.isDown || this.wasd.W.isDown) {
            this.player.setVelocityY(-speed);
          } else if (this.cursors.down.isDown || this.wasd.S.isDown) {
            this.player.setVelocityY(speed);
          }

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

      if (cancelled) return;
      const game = new Phaser.Game(config);
      phaserGameRef.current = game;

      // @ts-ignore
      window.handleExhibitInteract = onExhibitInteract;
    };

    init();

    return () => {
      cancelled = true;
      phaserGameRef.current?.destroy(true);
      phaserGameRef.current = null;
    };
  }, [onExhibitInteract]);

  return <div ref={gameRef} className="w-full h-full" />;
}
