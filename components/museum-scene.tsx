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
    x: 100,
    y: 480,
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
      private nearColumn: { roomNumber: number; title: string } | null = null;
      private interactKey!: Phaser.Input.Keyboard.Key;
      private promptText!: Phaser.GameObjects.Text;
      private walls: Phaser.GameObjects.Rectangle[] = [];
      private lockedDoors: {
        collision: Phaser.GameObjects.Rectangle;
        roomNumber: number;
      }[] = [];
      private columns: {
        collision: Phaser.GameObjects.Rectangle;
        roomNumber: number;
        title: string;
      }[] = [];
      private map!: Phaser.Tilemaps.Tilemap;
      private layer1!: Phaser.Tilemaps.TilemapLayer;
      private layer2!: Phaser.Tilemaps.TilemapLayer;
      private layer3!: Phaser.Tilemaps.TilemapLayer;
      private map2!: Phaser.Tilemaps.Tilemap;
      private map2wall!: Phaser.Tilemaps.TilemapLayer;
      private map2floor!: Phaser.Tilemaps.TilemapLayer;
      private map3!: Phaser.Tilemaps.Tilemap;
      private map3wall!: Phaser.Tilemaps.TilemapLayer;
      private map3floor1!: Phaser.Tilemaps.TilemapLayer;
      private map3floor2!: Phaser.Tilemaps.TilemapLayer;

      constructor() {
        super({ key: "MainScene" });
      }

      preload() {
        this.load.spritesheet("player", "/sprites/Adam_run.png", {
          frameWidth: 16,
          frameHeight: 16,
        });

        this.load.tilemapTiledJSON("map1", "/tiles/map1.json");
        this.load.tilemapTiledJSON("map2", "/tiles/map2.json");
        this.load.tilemapTiledJSON("map3", "/tiles/map3.json");
        this.load.image("room", "/tiles/room.png");
        this.load.image("interior", "/tiles/interior.png");
        this.load.image("Dungeon_Tileset", "/tiles/Dungeon_Tileset.png");
        this.load.image("antarcticbees_interior", "/tiles/antarcticbees_interior_free_sample-export.png");

        this.createExhibitGraphics();
        this.createPlantGraphic();
        this.createBenchGraphic();
        this.createLockedDoorGraphic();
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

      create() {
        this.map = this.make.tilemap({ key: "map1" });
        const tileset1 = this.map.addTilesetImage("room", "room")!;
        const tileset2 = this.map.addTilesetImage("interior", "interior")!;

        this.layer1 = this.map.createLayer(
          "layer1",
          [tileset1, tileset2],
          0,
          0
        )!;
        this.layer2 = this.map.createLayer(
          "layer2",
          [tileset1, tileset2],
          0,
          0
        )!;
        this.layer3 = this.map.createLayer(
          "layer3",
          [tileset1, tileset2],
          0,
          0
        )!;

        this.layer1.setVisible(true);
        this.layer2.setVisible(true);
        this.layer3.setVisible(true);

        this.layer3.setDepth(0);
        this.layer2.setDepth(1);
        this.layer1.setDepth(2);

        this.map2 = this.make.tilemap({ key: "map2" });
        console.log('Map2 created:', this.map2);
        console.log('Map2 tilesets available:', this.map2.tilesets);
        
        const map2tileset = this.map2.addTilesetImage("Dungeon_Tileset", "Dungeon_Tileset")!;
        console.log('Map2 tileset added:', map2tileset);
        
        console.log('Map2 tilemap:', this.map2);
        console.log('Map2 tileset:', map2tileset);
        console.log('Map1 width:', this.map.widthInPixels);

        this.map2floor = this.map2.createLayer("Floor0", [map2tileset], this.map.widthInPixels, 0)!;
        this.map2wall = this.map2.createLayer("Floor1", [map2tileset], this.map.widthInPixels, 0)!;
        
        console.log('Map2 layers created:', {
          floor: this.map2floor,
          wall: this.map2wall
        });
        
        console.log('Map2 dimensions:', {
          width: this.map2.widthInPixels,
          height: this.map2.heightInPixels,
          offset: this.map.widthInPixels
        });

        this.map2floor.setVisible(true);
        this.map2wall.setVisible(true);

        this.map2floor.setDepth(3);
        this.map2wall.setDepth(4);

        // Debug: Add a colored rectangle to show map2 area
        this.add.rectangle(
          this.map.widthInPixels + this.map2.widthInPixels/2, 
          this.map2.heightInPixels/2, 
          this.map2.widthInPixels, 
          this.map2.heightInPixels, 
          0xff0000, 
          0.3
        ).setDepth(6);

        // Create Map3
        this.map3 = this.make.tilemap({ key: "map3" });
        console.log('Map3 created:', this.map3);
        console.log('Map3 tilesets available:', this.map3.tilesets);
        
        const map3tileset = this.map3.addTilesetImage("antarcticbees_interior_free_sample-export", "antarcticbees_interior")!;
        console.log('Map3 tileset added:', map3tileset);
        
        const map3OffsetX = this.map.widthInPixels + this.map2.widthInPixels;
        
        this.map3floor1 = this.map3.createLayer("floor1", [map3tileset], map3OffsetX, 0)!;
        this.map3floor2 = this.map3.createLayer("floor2", [map3tileset], map3OffsetX, 0)!;
        this.map3wall = this.map3.createLayer("wall", [map3tileset], map3OffsetX, 0)!;
        
        console.log('Map3 layers created:', {
          floor1: this.map3floor1,
          floor2: this.map3floor2,
          wall: this.map3wall
        });
        
        console.log('Map3 dimensions:', {
          width: this.map3.widthInPixels,
          height: this.map3.heightInPixels,
          offset: map3OffsetX
        });

        this.map3floor1.setVisible(true);
        this.map3floor2.setVisible(true);
        this.map3wall.setVisible(true);

        this.map3floor1.setDepth(5);
        this.map3floor2.setDepth(6);
        this.map3wall.setDepth(7);

        // Debug: Add a colored rectangle to show map3 area
        this.add.rectangle(
          map3OffsetX + this.map3.widthInPixels/2, 
          this.map3.heightInPixels/2, 
          this.map3.widthInPixels, 
          this.map3.heightInPixels, 
          0x00ff00, 
          0.3
        ).setDepth(8);

        this.physics.world.setBounds(
          0,
          0,
          this.map.widthInPixels + this.map2.widthInPixels + this.map3.widthInPixels,
          Math.max(this.map.heightInPixels, this.map2.heightInPixels, this.map3.heightInPixels)
        );

        this.add.rectangle(720, 100, 600, 60, 0x0f3460);
        this.add
          .text(720, 100, "BẢO TÀNG KHOA HỌC CHÍNH TRỊ", {
            fontSize: "24px",
            color: "#e8e8e8",
            fontStyle: "bold",
          })
          .setOrigin(0.5)
          .setDepth(10);

        this.add.rectangle(720 + this.map.widthInPixels, 100, 600, 60, 0x0f3460);
        this.add
          .text(720 + this.map.widthInPixels, 100, "PHÒNG 2: BẢN CHẤT & HÌNH THỨC", {
            fontSize: "24px",
            color: "#e8e8e8",
            fontStyle: "bold",
          })
          .setOrigin(0.5)
          .setDepth(10);

        this.add.rectangle(720 + this.map.widthInPixels + this.map2.widthInPixels, 100, 600, 60, 0x0f3460);
        this.add
          .text(720 + this.map.widthInPixels + this.map2.widthInPixels, 100, "PHÒNG 3: NGHIÊN CỨU KHOA HỌC", {
            fontSize: "24px",
            color: "#e8e8e8",
            fontStyle: "bold",
          })
          .setOrigin(0.5)
          .setDepth(10);

        const columnPositions = [
          { x: 350, y: 250, roomNumber: 1, title: "PHÒNG 1" },
          { x: 450, y: 250, roomNumber: 1, title: "PHÒNG 1" },

          { x: 700, y: 250, roomNumber: 2, title: "PHÒNG 2" },
          { x: 800, y: 250, roomNumber: 2, title: "PHÒNG 2" },

          { x: 1050, y: 250, roomNumber: 3, title: "PHÒNG 3" },
          { x: 1150, y: 250, roomNumber: 3, title: "PHÒNG 3" },
        ];

        const r1r2BoundaryX = (columnPositions[1].x + columnPositions[2].x) / 2;
        const r2r3BoundaryX = (columnPositions[3].x + columnPositions[4].x) / 2;
        const getRoomNumberByX = (x: number) => {
          if (x < r1r2BoundaryX) return 1;
          if (x < r2r3BoundaryX) return 2;
          return 3;
        };

        columnPositions.forEach((pos) => {
          this.createColumn(pos.x, pos.y, pos.roomNumber, pos.title);
        });

        const connectionDoorX = this.map.widthInPixels - 20;
        const connectionDoor = this.add.rectangle(connectionDoorX, 400, 40, 100, 0x8b4513);
        connectionDoor.setDepth(5);
        this.physics.add.existing(connectionDoor, true);
        this.add
          .text(connectionDoorX, 320, `TO ROOM 2`, {
            fontSize: "14px",
            color: "#fbbf24",
            fontStyle: "bold",
            align: "center",
          })
          .setOrigin(0.5)
          .setDepth(6);

        if (!unlockedRooms.has(3)) {
          const door = this.add.sprite(this.map.widthInPixels + this.map2.widthInPixels - 20, 400, "locked-door");
          door.setDepth(5);

          const doorCollision = this.add.rectangle(
            this.map.widthInPixels + this.map2.widthInPixels - 20,
            400,
            40,
            100,
            0xff0000,
            0
          );
          this.physics.add.existing(doorCollision, true);
          this.lockedDoors.push({
            collision: doorCollision,
            roomNumber: 3,
          });

          this.add
            .text(this.map.widthInPixels + this.map2.widthInPixels - 60, 320, `ROOM 3\nLOCKED`, {
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

          const mappedRoom = getRoomNumberByX(exhibit.position.x);
          const exhibitForModal = { ...exhibit, roomNumber: mappedRoom };

          exhibitSprite.setData("exhibitData", exhibitForModal);
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

        this.cameras.main.setBounds(
          0,
          0,
          this.map.widthInPixels + this.map2.widthInPixels + this.map3.widthInPixels,
          Math.max(this.map.heightInPixels, this.map2.heightInPixels, this.map3.heightInPixels)
        );
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
          } else if (this.nearColumn !== null) {
            const column = this.nearColumn as {
              roomNumber: number;
              title: string;
            };
            alert(
              `Đây là ${column.title}\nPhòng ${column.roomNumber} - Thông tin chi tiết`
            );
          } else if (this.nearExhibit) {
            window.handleExhibitInteract?.(this.nearExhibit);
          }
        });
      }

      createColumn(x: number, y: number, roomNumber: number, title: string) {
        const pillar = this.add.rectangle(x, y, 60, 60, 0x8b7355);
        this.add.rectangle(x, y, 50, 50, 0xa67c52);
        this.add.rectangle(x, y, 40, 40, 0xd4af37);
        pillar.setDepth(3);

        const columnCollision = this.add.rectangle(x, y, 60, 60, 0xff0000, 0);
        this.physics.add.existing(columnCollision, true);
        this.walls.push(columnCollision);

        this.columns.push({
          collision: columnCollision,
          roomNumber: roomNumber,
          title: title,
        });

        this.add
          .text(x, y + 50, title, {
            fontSize: "10px",
            color: "#fbbf24",
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

        this.nearColumn = null;
        this.columns.forEach((column) => {
          const distance = Phaser.Math.Distance.Between(
            this.player.x,
            this.player.y,
            column.collision.x,
            column.collision.y
          );
          if (distance < 100) {
            this.nearColumn = {
              roomNumber: column.roomNumber,
              title: column.title,
            };
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
        } else if (this.nearColumn !== null) {
          const column = this.nearColumn as {
            roomNumber: number;
            title: string;
          };
          this.promptText.setText(
            `Nhấn E để xem thông tin phòng ${column.roomNumber}`
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
