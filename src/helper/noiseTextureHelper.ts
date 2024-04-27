import * as THREE from "three";
import { createNoise2D } from "simplex-noise";

// Función para generar un mapa de ruido que mezcle arena y césped
export function generateNoiseMap(
  width: number,
  height: number,
  scale: number,
  offsetX: number,
  offsetY: number
): number[][] {
  const noise2D = createNoise2D();

  const noiseMap: number[][] = [];

  for (let y = 0; y < height; y++) {
    noiseMap[y] = [];
    for (let x = 0; x < width; x++) {
      const sampleX = (x + offsetX) / scale;
      const sampleY = (y + offsetY) / scale;
      const noiseValue = noise2D(sampleX, sampleY);
      noiseMap[y][x] = noiseValue;
    }
  }

  return noiseMap;
}

function mixColors(
  color1: THREE.Color,
  color2: THREE.Color,
  amount: number
): THREE.Color {
  const r = lerp(color1.r, color2.r, amount);
  const g = lerp(color1.g, color2.g, amount);
  const b = lerp(color1.b, color2.b, amount);
  return new THREE.Color(r, g, b);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// Función para generar una textura a partir del mapa de ruido
export function generateTextureFromNoiseMap(
  noiseMap: number[][]
): THREE.Texture {
  const canvas = document.createElement("canvas");
  canvas.width = noiseMap[0].length;
  canvas.height = noiseMap.length;
  const context = canvas.getContext("2d")!;

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const index = (y * canvas.width + x) * 4;
      const noiseValue = noiseMap[y][x];

      const color = mixColors(
        new THREE.Color("green"),
        new THREE.Color("yellow"),
        Math.pow((noiseValue + 1) / 2, 3)
      );

      // Convertir los valores de color a números enteros
      const r = Math.round(color.r * 255);
      const g = Math.round(color.g * 255);
      const b = Math.round(color.b * 255);

      // Asignar los valores de color a data
      data[index] = r; // Rojo
      data[index + 1] = g; // Verde
      data[index + 2] = b; // Azul
      data[index + 3] = 255; // Alpha (completamente opaco)
    }
  }

  context.putImageData(imageData, 0, 0);

  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;

  return texture;
}