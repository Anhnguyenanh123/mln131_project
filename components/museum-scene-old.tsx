"use client";

import { useEffect, useRef } from "react";
const PhaserLib = typeof window !== "undefined" ? require("phaser") : null;
type Phaser = typeof import("phaser");
import type { ExhibitData } from "@/types/museum";
import { museumData } from "@/data/museum-data";

declare global {
  interface Window {
    handleExhibitInteract?: (exhibit: ExhibitData) => void;
    handleDoorInteract?: (roomNumber: number) => void;
  }
}

interface MuseumSceneProps {
  onExhibitInteract: (exhibit: ExhibitData) => void;
  onDoorInteract: (roomNumber: number) => void;
  visitedExhibits: Set<string>;
  unlockedRooms: Set<number>;
  username: string;
}

export default function MuseumScene({
  onExhibitInteract,
  onDoorInteract,
  unlockedRooms,
  username,
}: MuseumSceneProps) {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserGameRef = useRef<any>(null);
  const playerPositionRef = useRef<{ x: number; y: number }>({
    x: 150,
    y: 600,
  });

  useEffect(() => {
    if (!gameRef.current || phaserGameRef.current || !PhaserLib) return;

    const Phaser = PhaserLib as unknown as Phaser;

    class MainScene extends Phaser.Scene {
      private player!: Phaser.Physics.Arcade.Sprite;
      private playerNameText!: Phaser.GameObjects.Text;
      private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
      private wasd!: {
        W: Phaser.Input.Keyboard.Key;
        A: Phaser.Input.Keyboard.Key;
        S: Phaser.Input.Keyboard.Key;
        D: Phaser.Input.Keyboard.Key;
      };
      private exhibits: Phaser.Physics.Arcade.Sprite[] = [];
      private nearExhibit: ExhibitData | null = null;
      private nearLockedDoor: number | null = null;
      private interactKey!: Phaser.Input.Keyboard.Key;
      private promptText!: Phaser.GameObjects.Text;
      private walls: Phaser.GameObjects.Rectangle[] = [];
      private lockedDoors: {
        collision: Phaser.GameObjects.Rectangle;
        roomNumber: number;
      }[] = [];
      private map!: Phaser.Tilemaps.Tilemap;
      private layer1!: Phaser.Tilemaps.TilemapLayer;
      private layer2!: Phaser.Tilemaps.TilemapLayer;
      private layer3!: Phaser.Tilemaps.TilemapLayer;

      constructor() {
        super({ key: "MainScene" });
      }

      preload() {
        this.load.spritesheet("player", "/sprites/Adam_run.png", {
          frameWidth: 16,
          frameHeight: 16,
        });

        this.load.tilemapTiledJSON("map1", "/tiles/map1.json");
        this.load.image("room", "/tiles/room.png");
        this.load.image("interior", "/tiles/interior.png");

        this.createExhibitGraphics();
        this.createPlantGraphic();
        this.createBenchGraphic();
        this.createInfoBoardGraphic();
      }

      createExhibitGraphics() {
        const colors = [
          0x3b82f6, 0x8b5cf6, 0x06b6d4, 0x3b82f6, 0xef4444, 0xf97316, 0xdc2626,
          0xf59e0b, 0x10b981, 0x14b8a6, 0xf59e0b, 0x6366f1, 0x8b5cf6, 0x06b6d4,
          0x6366f1, 0xec4899, 0xf43f5e, 0xdb2777, 0xec4899, 0x14b8a6, 0x06b6d4,
          0x0891b2, 0x14b8a6, 0xa855f7, 0x9333ea, 0x7c3aed, 0x64748b, 0x475569,
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

      createInfoBoardGraphic() {
        const graphics = this.make.graphics({ x: 0, y: 0 });
        graphics.fillStyle(0x8b4513, 1);
        graphics.fillRect(0, 0, 120, 80);
        graphics.fillStyle(0xf5f5f5, 1);
        graphics.fillRect(5, 5, 110, 70);
        graphics.fillStyle(0x374151, 1);
        graphics.fillRect(10, 10, 100, 60);
        graphics.generateTexture("info-board", 120, 80);
        graphics.destroy();
      }

      create() {
        this.map = this.make.tilemap({ key: "map1" });
        const tileset1 = this.map.addTilesetImage("room", "room")!;
        const tileset2 = this.map.addTilesetImage("interior", "interior")!;

        this.layer1 = this.map.createLayer("layer1", [tileset1, tileset2], 0, 0)!;
        this.layer2 = this.map.createLayer("layer2", [tileset1, tileset2], 0, 0)!;
        this.layer3 = this.map.createLayer("layer3", [tileset1, tileset2], 0, 0)!;

        this.layer1.setVisible(true);
        this.layer2.setVisible(true);
        this.layer3.setVisible(true);

        this.layer3.setDepth(0);
        this.layer2.setDepth(1);
        this.layer1.setDepth(2);

        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        this.add.rectangle(720, 100, 600, 60, 0x0f3460);
        this.add
          .text(720, 100, "BẢO TÀNG KHOA HỌC CHÍNH TRỊ", {
            fontSize: "24px",
            color: "#e8e8e8",
            fontStyle: "bold",
          })
          .setOrigin(0.5)
          .setDepth(10);

        const infoBoardPositions = [
          { x: 250, y: 250, title: "KHỞI NGUỒN\n& NỀN TẢNG" },
          { x: 450, y: 250, title: "BẢN CHẤT\n& HÌNH THỨC" },
          { x: 650, y: 250, title: "NHÀ NƯỚC\nPHÁP QUYỀN" },
          { x: 950, y: 250, title: "PHÁT HUY\nDÂN CHỦ" },
          { x: 1150, y: 250, title: "PHÒNG CHỐNG\nTHAM NHŨNG" },
          { x: 250, y: 550, title: "ĐỔI MỚI &\nCHUYỂN ĐỔI SỐ" },
          { x: 450, y: 550, title: "TRÁCH NHIỆM\nCÔNG DÂN" },
          { x: 650, y: 550, title: "ĐANG\nXÂY DỰNG" },
          { x: 950, y: 550, title: "ĐANG\nXÂY DỰNG" },
          { x: 1150, y: 550, title: "ĐANG\nXÂY DỰNG" }
        ];

        infoBoardPositions.forEach(pos => {
          this.createInfoBoard(pos.x, pos.y, pos.title);
        });

        const plantPositions = [
          { x: 180, y: 180 }, { x: 320, y: 180 },
          { x: 380, y: 180 }, { x: 520, y: 180 },
          { x: 580, y: 180 }, { x: 720, y: 180 },
          { x: 880, y: 180 }, { x: 1020, y: 180 },
          { x: 1080, y: 180 }, { x: 1220, y: 180 },
          { x: 180, y: 620 }, { x: 320, y: 620 },
          { x: 380, y: 620 }, { x: 520, y: 620 },
          { x: 580, y: 620 }, { x: 720, y: 620 },
          { x: 880, y: 620 }, { x: 1020, y: 620 },
          { x: 1080, y: 620 }, { x: 1220, y: 620 }
        ];

        plantPositions.forEach(pos => {
          this.addPlant(pos.x, pos.y);
        });

        const benchPositions = [
          { x: 350, y: 400 }, { x: 550, y: 400 },
          { x: 850, y: 400 }, { x: 1050, y: 400 }
        ];

        benchPositions.forEach(pos => {
          this.addBench(pos.x, pos.y);
        });

        if (!unlockedRooms.has(2)) {
          const door = this.add.sprite(1440, 400, "locked-door");
          door.setDepth(5);

          const doorCollision = this.add.rectangle(
            1440,
            400,
            40,
            100,
            0xff0000,
            0
          );
          this.physics.add.existing(doorCollision, true);
          this.lockedDoors.push({
            collision: doorCollision,
            roomNumber: 2,
          });

          this.add
            .text(1400, 320, `ROOM 2\nLOCKED`, {
              fontSize: "14px",
              color: "#fbbf24",
              fontStyle: "bold",
              align: "center",
            })
            .setOrigin(0.5)
            .setDepth(6);
        }

        museumData.forEach((exhibit) => {
          const exhibitSprite = this.physics.add.sprite(
            exhibit.position.x,
            exhibit.position.y,
            `exhibit-${exhibit.id}`
          );
          exhibitSprite.setImmovable(true);
          exhibitSprite.setData("exhibitData", exhibit);
          exhibitSprite.setDepth(5);
          this.exhibits.push(exhibitSprite);
        });

        this.player = this.physics.add.sprite(
          playerPositionRef.current.x,
          playerPositionRef.current.y,
          "player"
        );
        this.player.setCollideWorldBounds(true);
        this.player.setScale(2);
        this.player.setDepth(10);

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

        this.lockedDoors.forEach((door) => {
          this.physics.add.collider(this.player, door.collision);
        });

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

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
          if (this.nearLockedDoor !== null) {
            window.handleDoorInteract?.(this.nearLockedDoor);
          } else if (this.nearExhibit) {
            window.handleExhibitInteract?.(this.nearExhibit);
          }
        });
      }

      createInfoBoard(x: number, y: number, title: string) {
        const board = this.add.sprite(x, y, "info-board");
        board.setDepth(3);
        
        this.add
          .text(x, y, title, {
            fontSize: "12px",
            color: "#ffffff",
            fontStyle: "bold",
            align: "center",
          })
          .setOrigin(0.5)
          .setDepth(4);
      }

      addPlant(x: number, y: number) {
        const plant = this.add.sprite(x, y, "plant");
        plant.setDepth(2);
      }

      addBench(x: number, y: number) {
        const bench = this.add.sprite(x, y, "bench");
        bench.setDepth(2);
      }

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
            .text(exhibit.position.x, exhibit.position.y + 100, exhibit.title, {
              fontSize: "13px",
              color: "#e8e8e8",
              align: "center",
              wordWrap: { width: 180 },
            })
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
          this.physics.add.collider(this.player, door.collision);
        });

        this.cameras.main.setBounds(0, 0, 3000, 1200);
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
          if (this.nearLockedDoor !== null) {
            window.handleDoorInteract?.(this.nearLockedDoor);
          } else if (this.nearExhibit) {
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

        this.nearLockedDoor = null;
        this.lockedDoors.forEach((door) => {
          const distance = Phaser.Math.Distance.Between(
            this.player.x,
            this.player.y,
            door.collision.x,
            door.collision.y
          );
          if (distance < 150) {
            this.nearLockedDoor = door.roomNumber;
          }
        });

        if (this.nearLockedDoor !== null) {
          this.promptText.setText(
            `Nhấn E để làm quiz mở Phòng ${this.nearLockedDoor}`
          );
          this.promptText.setVisible(true);
          this.promptText.setPosition(
            this.cameras.main.width / 2,
            this.cameras.main.height - 60
          );
        } else if (this.nearExhibit) {
          this.promptText.setText("Nhấn E để xem nội dung");
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

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: gameRef.current,
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

    const game = new Phaser.Game(config);
    phaserGameRef.current = game;

    window.handleExhibitInteract = onExhibitInteract;
    window.handleDoorInteract = onDoorInteract;

    return () => {
      game.destroy(true);
      phaserGameRef.current = null;
    };
  }, [onExhibitInteract, onDoorInteract, unlockedRooms, username]);

  return <div ref={gameRef} className="w-full h-full" />;
}
