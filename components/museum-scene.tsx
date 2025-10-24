"use client";

import { useEffect, useRef, useState } from "react";
const PhaserLib = typeof window !== "undefined" ? require("phaser") : null;
type Phaser = typeof import("phaser");
import type { ExhibitData } from "@/types/museum";
import { museumData } from "@/data/museum-data";
import PictureModal from "@/components/picture-modal";

// declare global {
//   interface Window {
//     handleExhibitInteract?: (exhibit: ExhibitData) => void;
//     handleDoorInteract?: (roomNumber: number) => void;
//     showPictureModal?: (imagePath: string, caption: string) => void;
//     unlockRoom?: (roomNumber: number) => void;
//   }
// }

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
  visitedExhibits,
  unlockedRooms,
  username,
}: MuseumSceneProps) {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserGameRef = useRef<any>(null);
  const [pictureModalOpen, setPictureModalOpen] = useState(false);
  const [currentPicture, setCurrentPicture] = useState<string>("");
  const [currentCaption, setCurrentCaption] = useState<string>("");
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
      private nearExhibit: ExhibitData | null = null;
      private nearLockedDoor: number | null = null;
      private nearPicture: { id: number; imagePath: string; caption: string } | null = null;
      private nearInfoPoint: ExhibitData | null = null;
      private interactKey!: Phaser.Input.Keyboard.Key;
      private promptText!: Phaser.GameObjects.Text;
      private walls: Phaser.GameObjects.Rectangle[] = [];
      private exhibits: Phaser.Physics.Arcade.Sprite[] = [];
      private lockedDoors: {
        collision: Phaser.GameObjects.Rectangle;
        roomNumber: number;
      }[] = [];
      private pictures: {
        collision: Phaser.GameObjects.Rectangle;
        id: number;
        imagePath: string;
        caption: string;
      }[] = [];
      private infoPoints: {
        collision: Phaser.GameObjects.Rectangle;
        exhibit: ExhibitData;
        sprite: Phaser.GameObjects.Sprite;
      }[] = [];
      private columns: {
        collision: Phaser.GameObjects.Rectangle;
        roomNumber: number;
        title: string;
      }[] = [];
      private roomBorders: {
        room2Border: Phaser.GameObjects.Rectangle;
        room3Border: Phaser.GameObjects.Rectangle;
      } | null = null;
      private backButtons: {
        bg: Phaser.GameObjects.Rectangle;
        text: Phaser.GameObjects.Text;
        room: number;
      }[] = [];
      private goToRoomButtons: {
        bg: Phaser.GameObjects.Rectangle;
        text: Phaser.GameObjects.Text;
        room: number;
      }[] = [];
      private topBorder!: Phaser.GameObjects.Rectangle;
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
        this.load.image(
          "antarcticbees_interior",
          "/tiles/antarcticbees_interior_free_sample-export.png"
        );

        this.createInfoPointGraphic();
      }

      createInfoPointGraphic() {
        const graphics = this.make.graphics({ x: 0, y: 0 });

        graphics.fillStyle(0x3b82f6, 1);
        graphics.fillCircle(40, 40, 35);

        graphics.fillStyle(0xffffff, 1);
        graphics.fillCircle(40, 25, 5);
        graphics.fillRect(35, 35, 10, 25);

        graphics.generateTexture("info-point", 80, 80);
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
            const doorCollision = this.add.rectangle(
              x,
              600,
              40,
              200,
              0xff0000,
              0
            );
            this.physics.add.existing(doorCollision, true);
            this.lockedDoors.push({
              collision: doorCollision,
              roomNumber: i + 1,
            });

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
        const map2tileset = this.map2.addTilesetImage(
          "Dungeon_Tileset",
          "Dungeon_Tileset"
        )!;

        this.map2floor = this.map2.createLayer(
          "Floor0",
          [map2tileset],
          this.map.widthInPixels,
          0
        )!;
        this.map2wall = this.map2.createLayer(
          "Floor1",
          [map2tileset],
          this.map.widthInPixels,
          0
        )!;

        this.map2floor.setVisible(true);
        this.map2wall.setVisible(true);

        this.map2floor.setDepth(3);
        this.map2wall.setDepth(4);

        this.add
          .rectangle(
            this.map.widthInPixels + this.map2.widthInPixels / 2,
            this.map2.heightInPixels / 2,
            this.map2.widthInPixels,
            this.map2.heightInPixels,
            0xff0000,
            0.3
          )
          .setDepth(6);

        this.map3 = this.make.tilemap({ key: "map3" });

        const map3tileset = this.map3.addTilesetImage(
          "antarcticbees_interior_free_sample-export",
          "antarcticbees_interior"
        )!;

        const map3OffsetX = this.map.widthInPixels + this.map2.widthInPixels;

        this.map3floor1 = this.map3.createLayer(
          "floor1",
          [map3tileset],
          map3OffsetX,
          0
        )!;
        this.map3floor2 = this.map3.createLayer(
          "floor2",
          [map3tileset],
          map3OffsetX,
          0
        )!;
        this.map3wall = this.map3.createLayer(
          "wall",
          [map3tileset],
          map3OffsetX,
          0
        )!;

        this.map3floor1.setVisible(true);
        this.map3floor2.setVisible(true);
        this.map3wall.setVisible(true);

        this.map3floor1.setDepth(5);
        this.map3floor2.setDepth(6);
        this.map3wall.setDepth(7);

        this.add
          .rectangle(
            map3OffsetX + this.map3.widthInPixels / 2,
            this.map3.heightInPixels / 2,
            this.map3.widthInPixels,
            this.map3.heightInPixels,
            0x00ff00,
            0.3
          )
          .setDepth(8);

        this.physics.world.setBounds(
          0,
          0,
          this.map.widthInPixels +
            this.map2.widthInPixels +
            this.map3.widthInPixels,
          Math.max(
            this.map.heightInPixels,
            this.map2.heightInPixels,
            this.map3.heightInPixels
          )
        );

        this.topBorder = this.add.rectangle(
          this.map.widthInPixels / 2 +
            this.map2.widthInPixels / 2 +
            this.map3.widthInPixels / 2,
          70,
          this.map.widthInPixels +
            this.map2.widthInPixels +
            this.map3.widthInPixels,
          20,
          0xff0000,
          0
        );
        this.physics.add.existing(this.topBorder, true);

        this.add.rectangle(
          720 + this.map.widthInPixels,
          100,
          600,
          60,
          0x0f3460
        );
        this.add
          .text(
            720 + this.map.widthInPixels,
            100,
            "PHÒNG 2: BẢN CHẤT & HÌNH THỨC",
            {
              fontSize: "24px",
              color: "#e8e8e8",
              fontStyle: "bold",
            }
          )
          .setOrigin(0.5)
          .setDepth(10);

        this.add.rectangle(
          720 + this.map.widthInPixels + this.map2.widthInPixels,
          100,
          600,
          60,
          0x0f3460
        );
        this.add
          .text(
            720 + this.map.widthInPixels + this.map2.widthInPixels,
            100,
            "PHÒNG 3: NGHIÊN CỨU KHOA HỌC",
            {
              fontSize: "24px",
              color: "#e8e8e8",
              fontStyle: "bold",
            }
          )
          .setOrigin(0.5)
          .setDepth(10);

        // Initialize buttons for unlocked rooms
        this.refreshBackButtons();

        const columnPositions: any[] = [];

        columnPositions.forEach((pos) => {
          this.createColumn(pos.x, pos.y, pos.roomNumber, pos.title);
        });

        this.createRoomBorders();
        this.createPictures();
        this.createInfoPoints();

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

        this.cameras.main.setBounds(
          0,
          0,
          this.map.widthInPixels +
            this.map2.widthInPixels +
            this.map3.widthInPixels,
          Math.max(
            this.map.heightInPixels,
            this.map2.heightInPixels,
            this.map3.heightInPixels
          )
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

        this.interactKey.on("down", () => {
          if (this.nearInfoPoint !== null) {
            (window as any).handleExhibitInteract?.(this.nearInfoPoint);
          } else if (this.nearPicture !== null) {
            this.showPictureModal(this.nearPicture.imagePath, this.nearPicture.caption);
          } else if (this.nearLockedDoor !== null) {
            (window as any).handleDoorInteract?.(this.nearLockedDoor);
          }
        });

        if (this.roomBorders) {
          if (
            this.roomBorders.room2Border &&
            this.roomBorders.room2Border.body
          ) {
            this.physics.add.collider(
              this.player,
              this.roomBorders.room2Border
            );
          }
          if (
            this.roomBorders.room3Border &&
            this.roomBorders.room3Border.body
          ) {
            this.physics.add.collider(
              this.player,
              this.roomBorders.room3Border
            );
          }
        } else {
          console.log("Room borders not found!");
        }

        this.physics.add.collider(this.player, this.topBorder);
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

      createRoomBorders() {
        const room2BorderX = this.map.widthInPixels;
        const room2BorderY = this.map.heightInPixels / 2;
        const room2Border = this.add.rectangle(
          room2BorderX,
          room2BorderY,
          20,
          this.map.heightInPixels,
          0xff0000,
          0
        );
        this.physics.add.existing(room2Border, true);

        const room3BorderX = this.map.widthInPixels + this.map2.widthInPixels;
        const room3BorderY = this.map2.heightInPixels / 2;
        const room3Border = this.add.rectangle(
          room3BorderX,
          room3BorderY,
          20,
          this.map2.heightInPixels,
          0xff0000,
          0
        );
        this.physics.add.existing(room3Border, true);

        this.roomBorders = {
          room2Border,
          room3Border,
        };

        this.add
          .text(
            room2BorderX - 50,
            room2BorderY - 100,
            "🔒 PHÒNG 2\nLàm quiz để mở",
            {
              fontSize: "14px",
              color: "#fbbf24",
              fontStyle: "bold",
              align: "center",
            }
          )
          .setOrigin(0.5)
          .setDepth(10);

        this.add
          .text(
            room3BorderX - 50,
            room3BorderY - 100,
            "🔒 PHÒNG 3\nLàm quiz để mở",
            {
              fontSize: "14px",
              color: "#fbbf24",
              fontStyle: "bold",
              align: "center",
            }
          )
          .setOrigin(0.5)
          .setDepth(10);
      }

      createPictures() {
        const roomWidth = this.map.widthInPixels;
        const sectionWidth = roomWidth / 6;

        const picturePositions = [
          {
            x: sectionWidth * 0.5,
            y: 100,
            id: 1,
            imagePath: "/pic/r1-e1.webp",
            caption: "Lao động và bóc lột trong chế độ tư bản. Hình ảnh thể hiện sự tương phản giữa giai cấp tư sản và giai cấp vô sản trong xã hội tư bản."
          },
          { 
            x: sectionWidth * 1.5, 
            y: 100, 
            id: 2, 
            imagePath: "/pic/r1-e2.jpg",
            caption: "Đại hội lần thứ nhất của Đảng Cộng sản Việt Nam năm 1935. Sự kiện quan trọng trong lịch sử cách mạng Việt Nam."
          },
          { 
            x: sectionWidth * 2.5, 
            y: 100, 
            id: 3, 
            imagePath: "/pic/r1-e3.jpg",
            caption: "Chủ tịch Hồ Chí Minh - người anh hùng dân tộc và nhà cách mạng vĩ đại, người sáng lập Đảng Cộng sản Việt Nam."
          },
          {
            x: sectionWidth * 3.5,
            y: 100,
            id: 4,
            imagePath: "/pic/r1-e4.webp",
            caption: "Sự phát triển của lực lượng sản xuất và quan hệ sản xuất. Minh họa cho quy luật cơ bản của sự phát triển xã hội loài người."
          },
          { 
            x: sectionWidth * 4.5, 
            y: 100, 
            id: 5, 
            imagePath: "/pic/r2-e1.jpg",
            caption: "Cuộc cách mạng Tháng Mười Nga 1917. Sự kiện lịch sử đánh dấu sự ra đời của nhà nước xã hội chủ nghĩa đầu tiên trên thế giới."
          },
          { 
            x: sectionWidth * 5.5, 
            y: 100, 
            id: 6, 
            imagePath: "/pic/r2-e2.jpg",
            caption: "Mác-Lênin chủ nghĩa và sự vận dụng sáng tạo trong điều kiện cụ thể của Việt Nam."
          },
        ];

        picturePositions.forEach((pos) => {
          const collision = this.add.rectangle(
            pos.x,
            pos.y,
            100,
            60,
            0xff0000,
            0
          );
          this.physics.add.existing(collision, true);

          this.pictures.push({
            collision: collision,
            id: pos.id,
            imagePath: pos.imagePath,
            caption: pos.caption,
          });
        });
      }

      createInfoPoints() {
        const room1Exhibits = museumData
          .filter((exhibit) => exhibit.roomNumber === 1)
          .slice(0, 2);
        const room2Exhibits = museumData
          .filter((exhibit) => exhibit.roomNumber === 2)
          .slice(0, 2);
        const room3Exhibits = museumData
          .filter((exhibit) => exhibit.roomNumber === 3)
          .slice(0, 2);

        const room1Positions = [
          { x: 300, y: 300 },
          { x: 300, y: 600 },
        ];
        room1Exhibits.forEach((exhibit, index) => {
          const pos = room1Positions[index];
          this.createInfoPoint(pos.x, pos.y, exhibit);
        });

        const room2Positions = [
          { x: this.map.widthInPixels + 300, y: 300 },
          { x: this.map.widthInPixels + 300, y: 600 },
        ];

        room2Exhibits.forEach((exhibit, index) => {
          const pos = room2Positions[index];
          this.createInfoPoint(pos.x, pos.y, exhibit);
        });

        const room3Positions = [
          { x: this.map.widthInPixels + this.map2.widthInPixels + 300, y: 300 },
          { x: this.map.widthInPixels + this.map2.widthInPixels + 300, y: 600 },
        ];

        room3Exhibits.forEach((exhibit, index) => {
          const pos = room3Positions[index];
          this.createInfoPoint(pos.x, pos.y, exhibit);
        });
      }

      createInfoPoint(x: number, y: number, exhibit: ExhibitData) {
        const sprite = this.add.sprite(x, y, "info-point");
        sprite.setDepth(5);
        sprite.setScale(0.8);

        this.tweens.add({
          targets: sprite,
          scale: 1,
          duration: 1000,
          yoyo: true,
          repeat: -1,
          ease: "Sine.easeInOut",
        });

        this.add
          .text(x, y + 60, exhibit.title, {
            fontSize: "12px",
            color: "#e8e8e8",
            backgroundColor: "#000000",
            padding: { x: 8, y: 4 },
            align: "center",
            wordWrap: { width: 200 },
          })
          .setOrigin(0.5)
          .setDepth(5);

        const collision = this.add.rectangle(x, y, 100, 100, 0xff0000, 0);
        this.physics.add.existing(collision, true);

        this.infoPoints.push({
          collision: collision,
          exhibit: exhibit,
          sprite: sprite,
        });
      }

      showPictureModal(imagePath: string, caption: string) {
        this.scene.pause();

        (window as any).showPictureModal?.(imagePath, caption);
      }

      createBackToRoom1Button(x: number, y: number, fromRoom: number) {
        // Create back button background
        const buttonBg = this.add.rectangle(x, y, 200, 50, 0x3366cc, 0.8);
        buttonBg.setStrokeStyle(2, 0x4488ff);
        buttonBg.setDepth(10);
        buttonBg.setInteractive({ cursor: "pointer" });

        // Create back button text
        const buttonText = this.add.text(x, y, "VỀ PHÒNG 1", {
          fontSize: "16px",
          color: "#ffffff",
          fontStyle: "bold",
        });
        buttonText.setOrigin(0.5);
        buttonText.setDepth(11);

        // Store button references for later removal if needed
        if (!this.backButtons) {
          this.backButtons = [];
        }
        this.backButtons.push({
          bg: buttonBg,
          text: buttonText,
          room: fromRoom,
        });

        // Add hover effects
        buttonBg.on("pointerover", () => {
          buttonBg.setFillStyle(0x4488ff, 0.9);
          this.tweens.add({
            targets: [buttonBg, buttonText],
            scaleX: 1.05,
            scaleY: 1.05,
            duration: 100,
            ease: "Power2",
          });
        });

        buttonBg.on("pointerout", () => {
          buttonBg.setFillStyle(0x3366cc, 0.8);
          this.tweens.add({
            targets: [buttonBg, buttonText],
            scaleX: 1,
            scaleY: 1,
            duration: 100,
            ease: "Power2",
          });
        });

        // Add click event
        buttonBg.on("pointerdown", () => {
          this.teleportToRoom1(fromRoom);
        });
      }

      createGoToRoomButton(x: number, y: number, toRoom: number) {
        // Create button background
        const buttonBg = this.add.rectangle(
          x,
          y,
          200,
          50,
          toRoom === 2 ? 0x22c55e : 0x3b82f6,
          0.8
        );
        buttonBg.setStrokeStyle(2, toRoom === 2 ? 0x16a34a : 0x2563eb);
        buttonBg.setDepth(10);
        buttonBg.setInteractive({ cursor: "pointer" });

        // Create button text
        const buttonText = this.add.text(x, y, `ĐI TỚI PHÒNG ${toRoom}`, {
          fontSize: "16px",
          color: "#ffffff",
          fontStyle: "bold",
        });
        buttonText.setOrigin(0.5);
        buttonText.setDepth(11);

        // Add to tracking array
        if (!this.goToRoomButtons) {
          this.goToRoomButtons = [];
        }
        this.goToRoomButtons.push({
          bg: buttonBg,
          text: buttonText,
          room: toRoom,
        });

        // Add hover effects
        buttonBg.on("pointerover", () => {
          buttonBg.setFillStyle(toRoom === 2 ? 0x16a34a : 0x2563eb, 0.9);
          this.tweens.add({
            targets: [buttonBg, buttonText],
            scaleX: 1.05,
            scaleY: 1.05,
            duration: 100,
            ease: "Power2",
          });
        });

        buttonBg.on("pointerout", () => {
          buttonBg.setFillStyle(toRoom === 2 ? 0x22c55e : 0x3b82f6, 0.8);
          this.tweens.add({
            targets: [buttonBg, buttonText],
            scaleX: 1,
            scaleY: 1,
            duration: 100,
            ease: "Power2",
          });
        });

        // Add click event
        buttonBg.on("pointerdown", () => {
          this.teleportToRoom(toRoom);
        });
      }

      teleportToRoom(roomNumber: number) {
        // Create teleport effect
        const teleportEffect = this.add.circle(
          this.player.x,
          this.player.y,
          0,
          roomNumber === 2 ? 0x22c55e : 0x3b82f6,
          0.6
        );
        teleportEffect.setDepth(15);

        this.tweens.add({
          targets: teleportEffect,
          radius: 100,
          alpha: 0,
          duration: 500,
          ease: "Power2",
          onComplete: () => {
            teleportEffect.destroy();
          },
        });

        // Calculate target position
        let targetX: number;
        if (roomNumber === 2) {
          targetX = this.map.widthInPixels + 100; // Room 2 position
        } else if (roomNumber === 3) {
          targetX = this.map.widthInPixels + this.map2.widthInPixels + 100; // Room 3 position
        } else {
          targetX = 720; // Default to room 1 center
        }

        // Teleport player
        this.player.setPosition(targetX, 480);
        this.playerNameText.setPosition(targetX, 510);

        // Update position reference
        (window as any).playerPositionRef.current = { x: targetX, y: 480 };

        // Show success message
        const roomNames = {
          2: "PHÒNG 2: BẢN CHẤT & HÌNH THỨC",
          3: "PHÒNG 3: NGHIÊN CỨU KHOA HỌC",
        };

        const successMessage = this.add.text(
          targetX,
          400,
          `✅ Chào mừng đến ${
            roomNames[roomNumber as keyof typeof roomNames]
          }!`,
          {
            fontSize: "18px",
            color: roomNumber === 2 ? "#22c55e" : "#3b82f6",
            fontStyle: "bold",
            backgroundColor: "#000000",
            padding: { x: 10, y: 5 },
          }
        );
        successMessage.setOrigin(0.5);
        successMessage.setDepth(20);

        // Auto remove success message
        this.time.delayedCall(3000, () => {
          if (successMessage && successMessage.scene) {
            successMessage.destroy();
          }
        });
      }

      refreshBackButtons() {
        // Clear existing back buttons
        if (this.backButtons) {
          this.backButtons.forEach((button) => {
            button.bg.destroy();
            button.text.destroy();
          });
          this.backButtons = [];
        }

        // Clear existing go-to-room buttons
        if (this.goToRoomButtons) {
          this.goToRoomButtons.forEach((button) => {
            button.bg.destroy();
            button.text.destroy();
          });
          this.goToRoomButtons = [];
        }

        // Recreate back buttons for unlocked rooms (in rooms 2 and 3)
        const currentUnlockedRooms = (window as any).unlockedRooms;
        if (currentUnlockedRooms && currentUnlockedRooms.has(2)) {
          this.createBackToRoom1Button(this.map.widthInPixels + 100, 200, 2);
        }
        if (currentUnlockedRooms && currentUnlockedRooms.has(3)) {
          this.createBackToRoom1Button(
            this.map.widthInPixels + this.map2.widthInPixels + 100,
            200,
            3
          );
        }

        // Create go-to-room buttons in room 1 for unlocked rooms
        let buttonY = 300; // Starting Y position for buttons in room 1
        if (currentUnlockedRooms && currentUnlockedRooms.has(2)) {
          this.createGoToRoomButton(720, buttonY, 2); // Center of room 1, go to room 2
          buttonY += 70; // Move next button down
        }
        if (currentUnlockedRooms && currentUnlockedRooms.has(3)) {
          this.createGoToRoomButton(720, buttonY, 3); // Center of room 1, go to room 3
        }
      }

      teleportToRoom1(fromRoom: number) {
        // Create teleport effect
        const teleportEffect = this.add.circle(
          this.player.x,
          this.player.y,
          0,
          0x00aaff,
          0.6
        );
        teleportEffect.setDepth(15);

        this.tweens.add({
          targets: teleportEffect,
          radius: 100,
          alpha: 0,
          duration: 500,
          ease: "Power2",
          onComplete: () => {
            teleportEffect.destroy();
          },
        });

        // Teleport player to room 1 center
        this.player.setPosition(720, 480); // Center of room 1
        this.playerNameText.setPosition(720, 510);

        // Update position reference
        (window as any).playerPositionRef.current = { x: 720, y: 480 };

        // Refresh buttons to show available rooms
        this.refreshBackButtons();

        // Show success message
        const successMessage = this.add.text(720, 400, `Đã quay về Phòng 1!`, {
          fontSize: "20px",
          color: "#00ff88",
          fontStyle: "bold",
          backgroundColor: "#000000",
          padding: { x: 10, y: 5 },
        });
        successMessage.setOrigin(0.5);
        successMessage.setDepth(20);

        // Auto remove success message
        this.time.delayedCall(3000, () => {
          if (successMessage && successMessage.scene) {
            successMessage.destroy();
          }
        });
      }

      unlockRoom(roomNumber: number) {
        console.log("[v0] unlockRoom called for room", roomNumber);
        console.log("[v0] Teleporting player to room", roomNumber);

        // Define teleport positions for each room
        const teleportPositions = {
          2: { x: this.map.widthInPixels + 100, y: 480 }, // Room 2 entrance
          3: {
            x: this.map.widthInPixels + this.map2.widthInPixels + 100,
            y: 480,
          }, // Room 3 entrance
        };

        if (roomNumber === 2) {
          console.log("[v0] Teleporting to room 2");
          const targetPos = teleportPositions[2];

          // Create teleport effect
          const teleportEffect = this.add.circle(
            this.player.x,
            this.player.y,
            50,
            0x00ff00,
            0.8
          );
          teleportEffect.setDepth(200);

          // Animate teleport effect
          this.tweens.add({
            targets: teleportEffect,
            scaleX: 2,
            scaleY: 2,
            alpha: 0,
            duration: 500,
            onComplete: () => {
              teleportEffect.destroy();
            },
          });

          // Teleport player
          this.player.setPosition(targetPos.x, targetPos.y);
          this.playerNameText.setPosition(targetPos.x, targetPos.y + 30);

          // Update player position ref for persistence
          (window as any).playerPositionRef.current = {
            x: targetPos.x,
            y: targetPos.y,
          };

          // Show success message
          const successText = this.add
            .text(
              targetPos.x,
              targetPos.y - 100,
              "✅ CHÀO MỪNG ĐÊN PHÒNG 2!\n🎉 Quiz hoàn thành!",
              {
                fontSize: "16px",
                color: "#22c55e",
                fontStyle: "bold",
                align: "center",
                backgroundColor: "#000000",
                padding: { x: 10, y: 10 },
              }
            )
            .setOrigin(0.5)
            .setDepth(150);

          // Remove success message after 3 seconds
          this.time.delayedCall(3000, () => {
            if (successText) {
              successText.destroy();
            }
          });
        } else if (roomNumber === 3) {
          console.log("[v0] Teleporting to room 3");
          const targetPos = teleportPositions[3];

          // Create teleport effect
          const teleportEffect = this.add.circle(
            this.player.x,
            this.player.y,
            50,
            0x0099ff,
            0.8
          );
          teleportEffect.setDepth(200);

          // Animate teleport effect
          this.tweens.add({
            targets: teleportEffect,
            scaleX: 2,
            scaleY: 2,
            alpha: 0,
            duration: 500,
            onComplete: () => {
              teleportEffect.destroy();
            },
          });

          // Teleport player
          this.player.setPosition(targetPos.x, targetPos.y);
          this.playerNameText.setPosition(targetPos.x, targetPos.y + 30);

          // Update player position ref for persistence
          (window as any).playerPositionRef.current = {
            x: targetPos.x,
            y: targetPos.y,
          };

          // Show success message
          const successText = this.add
            .text(
              targetPos.x,
              targetPos.y - 100,
              "✅ CHÀO MỪNG ĐÊN PHÒNG 3!\n🔬 Khám phá khoa học!",
              {
                fontSize: "16px",
                color: "#22c55e",
                fontStyle: "bold",
                align: "center",
                backgroundColor: "#000000",
                padding: { x: 10, y: 10 },
              }
            )
            .setOrigin(0.5)
            .setDepth(150);

          // Remove success message after 3 seconds
          this.time.delayedCall(3000, () => {
            if (successText) {
              successText.destroy();
            }
          });
        }

        console.log(
          "[v0] Player teleported to position:",
          this.player.x,
          this.player.y
        );

        // Refresh back buttons after unlocking a room
        this.refreshBackButtons();
      }

      createPillar(x: number, y: number) {
        const pillar = this.add.rectangle(x, y, 40, 40, 0x8b7355);
        this.add.rectangle(x, y, 35, 35, 0xa67c52);
        pillar.setDepth(2);

        const pillarCollision = this.add.rectangle(x, y, 40, 40, 0xff0000, 0);
        this.physics.add.existing(pillarCollision, true);
        this.walls.push(pillarCollision);

        return pillar;
      }

      update() {
        if (!this.player) {
          console.error("Player not found in update!");
          return;
        }

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

        this.nearLockedDoor = null;
        if (this.roomBorders) {
          const door2X = this.map.widthInPixels;
          const door2Y = this.map.heightInPixels / 2;
          const distanceToDoor2 = Phaser.Math.Distance.Between(
            this.player.x,
            this.player.y,
            door2X,
            door2Y
          );

          const door3X = this.map.widthInPixels + this.map2.widthInPixels;
          const door3Y = this.map2.heightInPixels / 2;
          const distanceToDoor3 = Phaser.Math.Distance.Between(
            this.player.x,
            this.player.y,
            door3X,
            door3Y
          );

          if (distanceToDoor2 < 100) {
            this.nearLockedDoor = 2;
          } else if (distanceToDoor3 < 100) {
            this.nearLockedDoor = 3;
          }
        }

        this.nearPicture = null;
        for (const picture of this.pictures) {
          const distance = Phaser.Math.Distance.Between(
            this.player.x,
            this.player.y,
            picture.collision.x,
            picture.collision.y
          );

          if (distance < 80) {
            this.nearPicture = { id: picture.id, imagePath: picture.imagePath, caption: picture.caption };
            break;
          }
        }

        this.nearInfoPoint = null;
        for (const infoPoint of this.infoPoints) {
          const distance = Phaser.Math.Distance.Between(
            this.player.x,
            this.player.y,
            infoPoint.collision.x,
            infoPoint.collision.y
          );

          if (distance < 80) {
            this.nearInfoPoint = infoPoint.exhibit;
            break;
          }
        }

        if (this.nearInfoPoint !== null) {
          this.promptText.setText("Nhấn E để xem thông tin");
          this.promptText.setVisible(true);
          this.promptText.setPosition(
            this.cameras.main.width / 2,
            this.cameras.main.height - 60
          );
        } else if (this.nearPicture !== null) {
          this.promptText.setText("Nhấn E để xem bức tranh");
          this.promptText.setVisible(true);
          this.promptText.setPosition(
            this.cameras.main.width / 2,
            this.cameras.main.height - 60
          );
        } else if (this.nearLockedDoor !== null) {
          this.promptText.setText(
            `Nhấn E để làm quiz mở khóa Phòng ${this.nearLockedDoor}`
          );
          this.promptText.setVisible(true);
          this.promptText.setPosition(
            this.cameras.main.width / 2,
            this.cameras.main.height - 60
          );
        } else {
          this.promptText.setVisible(false);
        }

        (window as any).playerPositionRef.current = {
          x: this.player.x,
          y: this.player.y,
        };

        window.dispatchEvent(
          new CustomEvent("playerMove", {
            detail: { x: this.player.x, y: this.player.y },
          })
        );
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
        return wall;
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

    (window as any).handleExhibitInteract = onExhibitInteract;
    (window as any).handleDoorInteract = onDoorInteract;
    (window as any).showPictureModal = (imagePath: string, caption: string) => {
      setCurrentPicture(imagePath);
      setCurrentCaption(caption);
      setPictureModalOpen(true);
    };
    (window as any).playerPositionRef = playerPositionRef;
    (window as any).unlockedRooms = unlockedRooms;
    (window as any).unlockRoom = (roomNumber: number) => {
      const scene = game.scene.getScene("MainScene") as MainScene;
      if (scene && scene.unlockRoom) {
        scene.unlockRoom(roomNumber);
      }
    };

    return () => {
      game.destroy(true);
      phaserGameRef.current = null;
    };
  }, [
    onExhibitInteract,
    onDoorInteract,
    visitedExhibits,
    unlockedRooms,
    username,
  ]);

  const handlePictureModalClose = () => {
    setPictureModalOpen(false);
    if (phaserGameRef.current) {
      const scene = phaserGameRef.current.scene.getScene("MainScene");
      if (scene) {
        scene.scene.resume();
      }
    }
  };

  return (
    <>
      <div ref={gameRef} className="w-full h-full" />
      <PictureModal
        isOpen={pictureModalOpen}
        onClose={handlePictureModalClose}
        imagePath={currentPicture}
        caption={currentCaption}
      />
    </>
  );
}
