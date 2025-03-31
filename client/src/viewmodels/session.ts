import { ref, computed } from "vue";

const session = ref<{
    user: string | null
}>({
    user: null,
})

export const refSession = ()=> session;

export const isAdmin = computed( () => session.value.user == "John Smith" )

export function login(user: string) {
    session.value.user = user;
}

export function logout() {
    session.value.user = null;
}

