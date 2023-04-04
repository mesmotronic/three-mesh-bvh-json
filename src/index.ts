import * as THREE from 'three';
import { MeshBVH } from 'three-mesh-bvh';

/**
 * Serialize MeshBVH instance into plain Object that can easily be serialised into JSON
 * @author  Neil Rackett
 */
export const serializeToObject = (bvh: MeshBVH): any => {

  // console.time('serializeToObject');
  const serialized = MeshBVH.serialize(bvh);

  const obj = {
    index: Array.from(serialized.index as Uint32Array),
    roots: serialized.roots.map((root: ArrayBuffer) => Array.from(new Uint8Array(root))),
  };
  // console.timeEnd('serializeToObject');

  return obj;

};

/**
 * Serialize MeshBVH instance into JSON
 * @author  Neil Rackett
 */
export const serializeToJson = (bvh: MeshBVH): string => {

  // console.time('serializeToJson');
  const obj = serializeToObject(bvh);
  const json = JSON.stringify(obj);
  // console.timeEnd('serializeToJson');

  return json;

};

/**
 * Deserialize MeshBVH instance from plain Object
 * @author  Neil Rackett
 */
export const deserializeFromObject = (obj: any, geometry: THREE.BufferGeometry): MeshBVH => {

  // console.time('deserializeFromObject');
  obj.index = new Uint32Array(obj.index);
  obj.roots = obj.roots.map((root: number[]) => new Uint8Array(root).buffer);

  const bvh = MeshBVH.deserialize(obj, geometry);
  // console.timeEnd('deserializeFromObject');

  return bvh;

};

/**
 * Deserialize MeshBVH instance from JSON
 * @author  Neil Rackett
 */
export const deserializeFromJson = (json: string, geometry: THREE.BufferGeometry): MeshBVH => {

  // console.time('deserializeFromJson');
  const obj = JSON.parse(json);
  const bvh = deserializeFromObject(obj, geometry);
  // console.timeEnd('deserializeFromJson');

  return bvh;

};
