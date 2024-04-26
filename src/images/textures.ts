import { grassImg, sandImg } from "./images";
import { NearestFilter, RepeatWrapping, TextureLoader } from "three";

const groundTexture = new TextureLoader().load(grassImg);

const grassTexture = new TextureLoader().load(grassImg);
const sandTexture = new TextureLoader().load(sandImg);

groundTexture.wrapS = RepeatWrapping;
groundTexture.wrapT = RepeatWrapping;

groundTexture.magFilter = NearestFilter;
grassTexture.magFilter = NearestFilter;
sandTexture.magFilter = NearestFilter;

export { groundTexture, grassTexture, sandTexture };
