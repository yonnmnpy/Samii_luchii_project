import { defineStore } from "pinia";
import { reactive } from "vue";

class World2d {}

export const world_2d_singleton = defineStore("world_2d", () => {
	return { entities: reactive([]) };
});

export function registerEntity() {}
