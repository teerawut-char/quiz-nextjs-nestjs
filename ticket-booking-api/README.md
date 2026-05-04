# Ticket Booking API (NestJS)

Backend API สำหรับระบบจองตั๋วคอนเสิร์ต พัฒนาด้วย NestJS พร้อมระบบจัดการฐานข้อมูลที่ทรงพลังและระบบ Seat Locking ด้วย Redis

## วิธีการรันโปรเจกต์

### 1. รันผ่าน Docker (แนะนำ)
หากคุณใช้ Docker Compose จาก Root directory ระบบจะจัดการทั้ง API, Database และ Redis ให้พร้อมกันที่พอร์ต `3001`:
```bash
# รันจากโฟลเดอร์นอกสุด
docker-compose up --build
```

### 2. รันแบบ Local (เพื่อการพัฒนา)
หากต้องการรันเฉพาะ API ในเครื่องตัวเอง:
```bash
# เข้าไปในโฟลเดอร์ api
cd ticket-booking-api

# ติดตั้ง Dependencies
npm install

# รันโหมด Development (Watch mode)
npm run start:dev
```
*หมายเหตุ: อย่าลืมตั้งค่า `.env` และเปิดบริการ Postgres/Redis ในเครื่องก่อนรันแบบ Local ครับ*

---

## รายละเอียด Library ที่ใช้ (Tech Stack)

Backend ของเราถูกออกแบบมาให้รองรับการทำงานแบบ Real-time และมีความปลอดภัยสูง:

1.  **[NestJS 11](https://nestjs.com/)**: Framework หลักที่ใช้โครงสร้างแบบ Modular ทำให้โค้ดสะอาดและดูแลรักษาง่าย
2.  **[Prisma 7](https://www.prisma.io/)**: ORM รุ่นใหม่ล่าสุดที่ใช้จัดการฐานข้อมูล PostgreSQL รองรับ Multi-file Schema และความปลอดภัยสูง
3.  **[IoRedis](https://github.com/redis/ioredis)**: Library สำหรับเชื่อมต่อ Redis ใช้ในการทำ Seat Locking (การล็อคที่นั่งชั่วคราว) เพื่อป้องกัน Race Condition
4.  **[Passport](http://www.passportjs.org/) & [JWT](https://jwt.io/)**: ใช้สำหรับการทำ Authentication ทั้งระบบ User และ Admin (Admin Login)
5.  **[Bcrypt](https://github.com/kelektiv/node.bcrypt.js)**: ใช้ในการเข้ารหัส Password ก่อนเก็บลงฐานข้อมูล เพื่อความปลอดภัยขั้นสูงสุด
6.  **[Class-Validator](https://github.com/typestack/class-validator)**: ใช้ตรวจสอบข้อมูลที่ส่งเข้ามา (Request DTO) ให้ถูกต้องตามเงื่อนไขที่กำหนด
7.  **[TSX](https://github.com/privatenumber/tsx)**: ตัวรัน TypeScript ความเร็วสูงที่เรานำมาใช้สำหรับขั้นตอน Database Seeding

---

## ฟีเจอร์สำคัญใน API
*   **Automatic Seed**: ระบบจะสร้างข้อมูลเบื้องต้น (Admin, Concerts) ให้ทันทีเมื่อเริ่มรัน
*   **Prisma Folder Schema**: ใช้ฟีเจอร์ใหม่ของ Prisma 7 ในการแยกไฟล์ Schema เป็นสัดส่วน (User, Booking, Concert)
*   **Redis Flush**: ล้างค่า Cache อัตโนมัติเมื่อเริ่มระบบ (ในโหมด Docker)
*   **Global Validation**: ตรวจสอบ Input ทุกช่องทางผ่าน ValidationPipe
