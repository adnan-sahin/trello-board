<script setup lang="ts">
import { nanoid } from "nanoid"
import type { Column, ID, Task } from "~/types"
import draggable from "vuedraggable"

const columns = ref<Column[]>([
  {
    id: nanoid(),
    title: "Backlog",
    tasks: [
      { id: nanoid(), title: "Create a product landing page", createdAt: new Date() },
      { id: nanoid(), title: "Develop a product landing page", createdAt: new Date() },
      { id: nanoid(), title: "Fix the page", createdAt: new Date() },
    ],
  },
  {
    id: nanoid(),
    title: "Selected for Dev",
    tasks: [],
  },
  {
    id: nanoid(),
    title: "In Progress",
    tasks: [],
  },
  {
    id: nanoid(),
    title: "QA",
    tasks: [],
  },
  {
    id: nanoid(),
    title: "Complete",
    tasks: [],
  },
])

const alt = useKeyModifier("Alt")

const hanleDeleteTask = (e: ID, column: Column) => {
  column.tasks = column.tasks.filter((t) => t.id != e)
}
</script>

<template>
  <div>
    <draggable
      v-model="columns"
      group="columns"
      :animation="250"
      handle=".drag-handle"
      item-key="id"
      class="flex gap-4 overflow-x-auto items-start"
    >
      <template #item="{ element: column }: { element: Column }">
        <div class="column bg-gray-200 p-5 rounded min-w-[250px]">
          <header class="font-bold mb-4">
            <DragHandle />
            {{ column.title }}
          </header>
          <draggable
            v-model="column.tasks"
            :group="{ name: 'tasks', pull: alt ? 'clone' : true }"
            :animation="alt ? 0 : 250"
            item-key="id"
            handle=".drag-handle"
          >
            <template #item="{ element: task }: { element: Task }">
              <div>
                <TrelloBoardTask :task="task" @delete="(e) => hanleDeleteTask(e, column)" />
              </div>
            </template>
          </draggable>
          <footer>
            <NewTask @add="column.tasks.push($event)" />
          </footer>
        </div>
      </template>
    </draggable>
  </div>
</template>

<style lang="scss" scoped>

</style>
