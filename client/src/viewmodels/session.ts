import { ref, computed } from "vue";

type User = {
    id: number,
    avatar: string,
    name: string,
    username: string,
    isAdministrator: boolean
  };
  
  const session = ref<{ user: User | null }>({
    user: null,
  });

export const refSession = ()=> session;

export const isAdmin = computed(() => session.value.user?.isAdministrator === true);

export function login(user: User) {
    session.value.user = user;
}

export function isLoggedIn() {
    return session.value.user !== null;
}

export function logout() {
    session.value.user = null;
}

