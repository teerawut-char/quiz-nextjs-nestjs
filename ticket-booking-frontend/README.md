# Ticket Booking Frontend (Next.js)

ส่วนหน้าจอผู้ใช้งานของระบบจองตั๋วคอนเสิร์ต พัฒนาด้วย Next.js (App Router) และเน้นดีไซน์ที่ทันสมัยด้วย Tailwind CSS

## วิธีการรันโปรเจกต์

### 1. รันผ่าน Docker (แนะนำ)
หากคุณใช้ Docker Compose จาก Root directory ของโปรเจกต์ ระบบจะรัน Frontend ให้โดยอัตโนมัติที่พอร์ต `3000`:
```bash
# รันจากโฟลเดอร์นอกสุด
docker-compose up --build
```

### 2. รันแบบ Local (เพื่อการพัฒนา)
หากต้องการรันเฉพาะ Frontend ในเครื่องตัวเอง:
```bash
# เข้าไปในโฟลเดอร์ frontend
cd ticket-booking-frontend

# ติดตั้ง Dependencies
npm install

# รันโหมด Development
npm run dev
```
เปิดบราวเซอร์ไปที่ [http://localhost:3000](http://localhost:3000)

---

## รายละเอียด Library ที่ใช้ (Tech Stack)

เราเลือกใช้เครื่องมือที่ทันสมัยเพื่อให้ระบบทำงานได้รวดเร็วและจัดการ Code ได้ง่าย:

1.  **[Next.js 16](https://nextjs.org/)**: Framework หลักที่ใช้จัดการ Routing (App Router) และการ Render ทั้งฝั่ง Client และ Server
2.  **[Zustand](https://github.com/pmndrs/zustand)**: ใช้สำหรับจัดการ Global State ของแอป (เช่น ข้อมูลการเข้าสู่ระบบ หรือสถานะการเลือกที่นั่ง) ซึ่งเบากว่า Redux มาก
3.  **[Axios](https://axios-http.com/)**: ใช้สำหรับส่ง HTTP Request ไปยัง Backend API มีการตั้งค่า Interceptors เพื่อจัดการ Base URL ระหว่าง Docker และ Local
4.  **[Tailwind CSS 4](https://tailwindcss.com/)**: ใช้สำหรับการเขียน Style ทั้งหมดในโปรเจกต์ เน้นความรวดเร็วและ Responsive ที่ดีเยี่ยม
5.  **[Lucide React](https://lucide.dev/)**: ชุด Icon แบบ Vector ที่สวยงามและเบา สำหรับแสดงสัญลักษณ์ต่างๆ ใน UI
6.  **[UUID](https://github.com/uuidjs/uuid)**: ใช้สำหรับสร้าง Unique ID ฝั่ง Client (เช่น การระบุ Key ชั่วคราวสำหรับการเลือกที่นั่ง)
7.  **TypeScript**: เพิ่มความปลอดภัยในการเขียน Code ด้วยการระบุ Type ทำให้ลดข้อผิดพลาดได้ตั้งแต่ตอนเขียน

---

## โครงสร้างโฟลเดอร์ที่สำคัญ
*   `src/app`: หน้าจอต่างๆ ของระบบ (Home, Login, Dashboard)
*   `src/actions`: ส่วนที่ติดต่อกับ API (Server/Client Actions)
*   `src/store`: จัดการ State ด้วย Zustand
*   `src/lib`: การตั้งค่าเครื่องมือต่างๆ เช่น Axios Instance
*   `src/components`: UI Components ที่นำกลับมาใช้ใหม่ได้
