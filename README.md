# SMART RECYCLE BIN

AI-powered smart recycle bin for automated waste classification and sorting.

## Project Overview

**SMART RECYCLE BIN: AN AI-DRIVEN IOT SYSTEM FOR AUTOMATED WASTE CLASSIFICATION** is a senior project that uses Artificial Intelligence and IoT to classify waste automatically.

The system detects waste objects using a camera and a YOLO AI model, then sorts them into the correct category.

## Waste Categories

- Plastic
- Paper
- Metal

## How It Works

1. The user places an object into the system.
2. The camera captures the object.
3. The YOLO model classifies the waste type.
4. The stepper motor rotates the bin position:
   - Plastic: 120°
   - Metal: 240°
   - Paper: No rotation
5. The servo motor opens the door.
6. The object drops into the correct bin.
7. The system returns to its default position.

## System Components

- Raspberry Pi 4
- Camera
- YOLO AI Model
- Stepper Motor
- Servo Motor
- Ultrasonic Sensors
- Waste Containers

## Features

- AI-based waste classification
- Automatic waste sorting
- Real-time bin level monitoring
- Eco-friendly design
- No cloud dependency

## Technologies Used

- HTML
- CSS
- JavaScript
- Python
- YOLO
- IoT Hardware

## Project Goal

To improve recycling efficiency by reducing manual waste sorting and promoting smart environmental solutions.