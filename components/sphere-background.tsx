"use client"

import { useEffect, useRef } from "react"

interface Point {
  theta: number
  phi: number
}

export function SphereBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let points: Point[] = []
    let rotation = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createSphere = () => {
      points = []
      const numPoints = 2000
      const goldenRatio = (1 + Math.sqrt(5)) / 2
      const angleIncrement = Math.PI * 2 * goldenRatio

      for (let i = 0; i < numPoints; i++) {
        const t = i / numPoints
        const inclination = Math.acos(1 - 2 * t)
        const azimuth = angleIncrement * i

        points.push({
          theta: inclination,
          phi: azimuth,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      rotation += 0.0003

      const radius = Math.min(canvas.width, canvas.height) * 0.5
      const centerX = canvas.width + radius * 0.5
      const centerY = canvas.height * 0.5
      const perspective = 800

      const lightAngle = rotation * 0.5
      const lightX = Math.cos(lightAngle)
      const lightY = 0.2
      const lightZ = Math.sin(lightAngle)

      const projectedPoints: Array<{
        x: number
        y: number
        z: number
        brightness: number
        scale: number
      }> = []

      points.forEach((point) => {
        const rotatedPhi = point.phi + rotation

        const x = radius * Math.sin(point.theta) * Math.cos(rotatedPhi)
        const y = radius * Math.cos(point.theta)
        const z = radius * Math.sin(point.theta) * Math.sin(rotatedPhi)

        const scale = perspective / (perspective + z)
        const projX = centerX + x * scale
        const projY = centerY + y * scale

        const nx = Math.sin(point.theta) * Math.cos(rotatedPhi)
        const ny = Math.cos(point.theta)
        const nz = Math.sin(point.theta) * Math.sin(rotatedPhi)

        const dot = nx * lightX + ny * lightY + nz * lightZ
        const brightness = Math.max(0, dot)

        projectedPoints.push({
          x: projX,
          y: projY,
          z: z,
          brightness,
          scale,
        })
      })

      projectedPoints.sort((a, b) => a.z - b.z)

      projectedPoints.forEach((point) => {
        const baseAlpha = 0.06 + point.scale * 0.12
        const alpha = baseAlpha + point.brightness * 0.15
        const pointRadius = 0.6 + point.scale * 1.2

        const green = 200 + Math.floor(point.brightness * 55)
        const red = 15 + Math.floor(point.brightness * 10)
        const blue = 80 + Math.floor(point.brightness * 30)

        ctx.beginPath()
        ctx.arc(point.x, point.y, pointRadius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(draw)
    }

    resize()
    createSphere()
    draw()

    const handleResize = () => {
      resize()
      createSphere()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0" aria-hidden="true" />
}
