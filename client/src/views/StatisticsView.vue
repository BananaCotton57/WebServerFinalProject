<template>
  <div class="statistics">
    <h1 class="title">Statistics</h1>

    <div class="columns is-centered">
      <div class="column is-one-third" v-for="(card, index) in stats" :key="index">
        <div class="box has-text-centered">
          <h3 class="subtitle">{{ card.title }}</h3>
          
          <div v-for="(value, key) in card.details" :key="key" class="stat-item">
            <p><strong>{{ key }}:</strong> {{ value }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Example data for today, this week, and all-time stats (replace with actual data)
const activities = ref([
  { id: 1, date: "2025-03-05", distance: 0, duration: 0, pace: 0, calories: 0 },
  { id: 2, date: "2025-03-03", distance: 3696, duration: 30, pace: 1.4, calories: 440 },
  { id: 3, date: "2025-02-28", distance: 3.8, duration: 165, pace: 1.4, calories: 1127.5 },
]);

// Computed properties for today's, this week's, and all-time activities
const today = new Date().toISOString().split("T")[0];

const todayActivities = computed(() =>
  activities.value.filter((a) => a.date === today)
);

const weeklyActivities = computed(() => {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  return activities.value.filter(
    (a) => new Date(a.date) >= weekAgo
  );
});

// Stats cards content with detailed info for each period (Today, This Week, All Time)
const stats = [
  {
    title: "Today",
    details: {
      "Distance": `${todayActivities.value.reduce((sum, a) => sum + a.distance, 0)} ft`,
      "Duration": `${todayActivities.value.reduce((sum, a) => sum + a.duration, 0)}:0`,
      "Avg Pace": `${todayActivities.value.reduce((sum, a) => sum + a.pace, 0)} mph`,
      "Calories": `${todayActivities.value.reduce((sum, a) => sum + a.calories, 0)}`,
    },
  },
  {
    title: "This Week",
    details: {
      "Distance": `${weeklyActivities.value.reduce((sum, a) => sum + a.distance, 0)} ft`,
      "Duration": `${weeklyActivities.value.reduce((sum, a) => sum + a.duration, 0)}:30`,
      "Avg Pace": `${weeklyActivities.value.reduce((sum, a) => sum + a.pace, 0)} mph`,
      "Calories": `${weeklyActivities.value.reduce((sum, a) => sum + a.calories, 0)}`,
    },
  },
  {
    title: "All Time",
    details: {
      "Distance": `${activities.value.reduce((sum, a) => sum + a.distance, 0)} mi`,
      "Duration": `${activities.value.reduce((sum, a) => sum + a.duration, 0)}:45`,
      "Avg Pace": `${activities.value.reduce((sum, a) => sum + a.pace, 0)} mph`,
      "Calories": `${activities.value.reduce((sum, a) => sum + a.calories, 0)}`,
    },
  },
];
</script>

<style scoped>
.statistics {
  padding: 20px;
}

.box {
  background-color: #f5f5f5;
  border-radius: 8px;
}

.stat-item {
  margin-bottom: 10px;
}
</style>
