"use client";

import { useEffect, useRef } from "react"; 

export default function PongGame(){
    const canvasref = useRef<HTMLCanvasElement | null>(null);

    const PaddleHeight = 100;
    const Paddlewidth = 10;

    const leftPaddle = useRef({x:10, y:200})
    const rightPaddle = useRef({x:780, y:200})
    const ball = useRef({
        x:500,
        y:250,
        dx:4,
        dy:4,
        size:10,
    })


    useEffect(() => {
        const canvas = canvasref.current!;
        const ctx = canvas.getContext("2d")!;

        canvas.width = 800;
        canvas.height = 500;

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        //paddles
        ctx.fillStyle = "white";
        ctx.fillRect(leftPaddle.current.x, leftPaddle.current.y, leftPaddle.width, leftPaddle.height)

        // ball
        ctx.beginPath()
        ctx.arc(ball.current.x, ball.current.y, ball.current.size, 0, Math.PI * 2)
        ctx.fill()
    }, []);


    return (
        <div className="flex justify-center items-center h-screen hg-gray-900">
            <canvas ref={canvasref} className="border border-white shadow-2xl shadow-[shadow]-300"/>
        </div>
    )
}