# ENGCE301 Final Project – Microservices Deployment & Scaling

## ผู้จัดทำ

สมาชิก 1 :
ชื่อ – นามสกุล : นาย ภูมิรพี กาวันนา
รหัสนักศึกษา : 67543206018-3

สมาชิก 2 :
ชื่อ – นามสกุล : นาย เตชธรรม วงศ์ษา
รหัสนักศึกษา : 67543206052-2

รายวิชา : ENGCE301 Web Application Development

---

# ภาพรวมโปรเจค

โปรเจคนี้เป็นการพัฒนาและ Deploy ระบบ **Task Management Board** ที่สร้างด้วยแนวคิด **Microservices Architecture**

ใน Final Set 2 จะเน้นไปที่

* การ Deploy ระบบขึ้น Cloud
* การทำให้ระบบสามารถ Scale ได้
* การใช้ Container เพื่อจัดการ Service ต่าง ๆ

ระบบถูก Deploy ขึ้น **Railway Platform** ซึ่งเป็น Cloud Platform ที่สามารถ Deploy Application ได้อย่างรวดเร็ว

---

# สถาปัตยกรรมระบบ

Frontend
↓
Nginx Gateway
↓
Auth Service | Task Service | Log Service
↓
Database

ในระบบนี้ Service ต่าง ๆ ถูกแยกออกจากกันเพื่อให้สามารถ

* Deploy แยกกันได้
* Scale ได้
* ดูแลรักษาได้ง่าย

---

# เทคโนโลยีที่ใช้

* Node.js
* Express.js
* SQLite / Cloud Database
* Docker
* Docker Compose
* Nginx
* Railway (Cloud Platform)
* HTML / JavaScript

---

# Microservices ที่ใช้ในระบบ

## 1. Auth Service

Auth Service ทำหน้าที่เกี่ยวกับการยืนยันตัวตนของผู้ใช้งาน

หน้าที่หลัก

* Register ผู้ใช้
* Login ผู้ใช้
* สร้าง JWT Token

API

POST /auth/login
POST /auth/register

เมื่อ Login สำเร็จ ระบบจะส่ง JWT Token กลับไปให้ผู้ใช้เพื่อใช้เรียก API อื่น

---

## 2. Task Service

Task Service ใช้สำหรับจัดการ Task

ความสามารถ

* สร้าง Task
* แสดง Task
* แก้ไข Task
* ลบ Task

API

GET /tasks
POST /tasks
PUT /tasks/:id
DELETE /tasks/:id

---

## 3. Log Service

Log Service ใช้สำหรับเก็บ Event ที่เกิดขึ้นในระบบ เช่น

* LOGIN_SUCCESS
* TASK_CREATED
* TASK_UPDATED
* TASK_DELETED

API

POST /logs
GET /logs

ข้อมูล Log จะถูกเก็บพร้อมเวลา (timestamp)

---

# การ Scale ระบบ

Microservices Architecture ทำให้ระบบสามารถ Scale ได้ง่าย

ตัวอย่าง

* เพิ่มจำนวน Task Service เพื่อรองรับผู้ใช้จำนวนมาก
* แยก Log Service ไปประมวลผลต่างหาก
* ใช้ Load Balancer เพื่อกระจาย Request

ข้อดีของการ Scale แบบนี้

* รองรับผู้ใช้จำนวนมาก
* เพิ่มประสิทธิภาพระบบ
* ลดภาระของ Service เดียว

---

# การ Deploy บน Railway

Railway เป็น Cloud Platform ที่ช่วยให้สามารถ Deploy Application ได้ง่าย

ขั้นตอนการ Deploy

## 1. สร้าง Git Repository

```bash
git init
git add .
git commit -m "final project"
```

---

## 2. Push ไปยัง GitHub

```bash
git remote add origin <repository-url>
git push -u origin main
```

---

## 3. Deploy ผ่าน Railway

ขั้นตอน

1. เข้าเว็บไซต์ Railway
2. สร้าง Project ใหม่
3. เชื่อมต่อ GitHub Repository
4. Railway จะทำการ Build และ Deploy Application อัตโนมัติ

หลังจาก Deploy เสร็จ ระบบจะมี URL สำหรับเข้าใช้งาน

ตัวอย่าง

https://final-project-production.up.railway.app

---

# การทำงานของ Container

ระบบใช้ **Docker** เพื่อสร้าง Container สำหรับแต่ละ Service

ข้อดีของ Docker

* Environment เหมือนกันทุกเครื่อง
* Deploy ง่าย
* สามารถ Scale ได้ง่าย

Service ที่รันใน Container

* nginx
* auth-service
* task-service
* log-service

---

# การทดสอบระบบ

สามารถทดสอบ API ด้วย

* Postman
* curl
* Browser

ตัวอย่าง

## Login

POST /auth/login

Body

{
"username":"test",
"password":"1234"
}

---

## Create Task

POST /tasks

Body

{
"title":"Finish Final Project"
}

---

# ผลลัพธ์

ระบบสามารถ

* Deploy ขึ้น Cloud ได้สำเร็จ
* ใช้งานผ่าน URL บน Railway
* รองรับ Microservices Architecture
* สามารถ Scale ได้ในอนาคต

---

# สรุป

โปรเจคนี้แสดงการพัฒนา Web Application ด้วยแนวคิด **Microservices Architecture** และการ Deploy ขึ้น **Cloud Platform**

การใช้ Docker และ Railway ช่วยให้การ Deploy ทำได้ง่าย และสามารถขยายระบบได้ในอนาคต

แนวทางนี้เป็นแนวทางเดียวกับที่ใช้ในการพัฒนาระบบ Web Application ในระดับ Production จริง


## Cloud Deployment (Railway) URLs
- Auth Service: `[(https://auth-service-production.up.railway.app)]`
- Task Service: `[(https://task-service-production.up.railway.app)]`
- User Service: `[(https://log-service-production.up.railway.app)]`
- Nginx Gateway: `[(https://nginx-production.up.railway.app)]`

#ทำเสร็จแล้วแต่แคปภาพใส่ไม่ทันบน DBeaver , reaway
