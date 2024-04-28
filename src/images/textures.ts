import {
  grassImg,
  sandImg,
  woodImg,
  ball1Img,
  ball2Img,
  ball3Img,
  ball4Img,
  ball5Img,
  ball6Img,
  ball7Img,
  capsuleImg,
  shipFreezerImg,
} from "./images";
import { NearestFilter, RepeatWrapping, Texture, TextureLoader } from "three";

interface ITextures {
  [key: string]: Texture;
  groundTexture: Texture;
  grassTexture: Texture;
  sandTexture: Texture;
  woodTexture: Texture;
  ball1Texture: Texture;
  ball2Texture: Texture;
  ball3Texture: Texture;
  ball4Texture: Texture;
  ball5Texture: Texture;
  ball6Texture: Texture;
  ball7Texture: Texture;
  capsuleTexture: Texture;
}

const groundTexture = new TextureLoader().load(grassImg);

const grassTexture = new TextureLoader().load(grassImg);
const sandTexture = new TextureLoader().load(sandImg);
const woodTexture = new TextureLoader().load(woodImg);

const ball1Texture = new TextureLoader().load(ball1Img);
const ball2Texture = new TextureLoader().load(ball2Img);
const ball3Texture = new TextureLoader().load(ball3Img);
const ball4Texture = new TextureLoader().load(ball4Img);
const ball5Texture = new TextureLoader().load(ball5Img);
const ball6Texture = new TextureLoader().load(ball6Img);
const ball7Texture = new TextureLoader().load(ball7Img);

const capsuleTexture = new TextureLoader().load(capsuleImg);
const shipFreezerTexture = new TextureLoader().load(shipFreezerImg);

groundTexture.wrapS = RepeatWrapping;
groundTexture.wrapT = RepeatWrapping;

groundTexture.magFilter = NearestFilter;
grassTexture.magFilter = NearestFilter;
sandTexture.magFilter = NearestFilter;
woodTexture.magFilter = NearestFilter;

ball1Texture.magFilter = NearestFilter;
ball2Texture.magFilter = NearestFilter;
ball3Texture.magFilter = NearestFilter;
ball4Texture.magFilter = NearestFilter;
ball5Texture.magFilter = NearestFilter;
ball6Texture.magFilter = NearestFilter;
ball7Texture.magFilter = NearestFilter;

capsuleTexture.magFilter = NearestFilter;
shipFreezerTexture.magFilter = NearestFilter;

const textures: ITextures = {
  groundTexture,
  grassTexture,
  sandTexture,
  woodTexture,
  ball1Texture,
  ball2Texture,
  ball3Texture,
  ball4Texture,
  ball5Texture,
  ball6Texture,
  ball7Texture,
  capsuleTexture,
  shipFreezerTexture,
};

export default textures;
