"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

export default function PongGame() {
    const canvasref = useRef<HTMLCanvasElement | null>(null);

    const PaddleHeight = 100;
    const Paddlewidth = 10;

    const leftPaddle = useRef({ x: 10, y: 200 })
    const rightPaddle = useRef({ x: 780, y: 200 })
    const ball = useRef({
        x: 500,
        y: 250,
        dx: 2,
        dy: 2,
        size: 10,
    })


    useEffect(() => {
        const canvas = canvasref.current!;
        const ctx = canvas.getContext("2d")!;

        canvas.width = 800;
        canvas.height = 500;

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        function handleKey(e: KeyboardEvent) {
            const speed = 20

            //keys left
            if (e.key == "w") leftPaddle.current.y -= speed
            if (e.key == "s") leftPaddle.current.y += speed

            //keys right
            if (e.key == "ArrowUp") rightPaddle.current.y -= speed
            if (e.key == "ArrowDown") rightPaddle.current.y += speed
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            //paddles
            ctx.fillStyle = "white";
            ctx.fillRect(leftPaddle.current.x, leftPaddle.current.y, Paddlewidth, PaddleHeight)
            ctx.fillRect(rightPaddle.current.x, rightPaddle.current.y, Paddlewidth, PaddleHeight)

            // ball
            ctx.beginPath()
            ctx.arc(ball.current.x, ball.current.y, ball.current.size, 0, Math.PI * 2)
            ctx.fill()
        }

        function update() {
            ball.current.x += ball.current.dx
            ball.current.y += ball.current.dy

            //wall collision
            if (ball.current.y < 0 || ball.current.y > canvas.height) {
                ball.current.dy *= -1
            }

            //paddle collision left
            if (
                ball.current.x < 20 &&
                ball.current.y > leftPaddle.current.y &&
                ball.current.y < leftPaddle.current.y + PaddleHeight
            ) {
                ball.current.dx *= -1
            }

            //paddle collision right
            if (
                ball.current.x < 850 &&
                ball.current.y > rightPaddle.current.y &&
                ball.current.y < rightPaddle.current.y + PaddleHeight
            ) {
                ball.current.dx *= -1
            }

        }

        function loop() {
            update()
            draw()
            requestAnimationFrame(loop)
        }

        loop()
        window.addEventListener("keydown", handleKey)

        return () => window.removeEventListener("keydown", handleKey)
    }, []);
    function onStartClick() {
        ball.current.x = 0
        ball.current.y = 0
    }

    return (
        <div className="flex justify-center items-center h-screen hg-gray-900">
            <canvas ref={canvasref} className="border border-white shadow-2xl shadow-[shadow]-300" />
            <Button onClick={() => onStartClick()}>Start</Button>
        </div>
    )
}