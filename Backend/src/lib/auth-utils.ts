export const refreshSession = async () => {
  try {
    // Force NextAuth to refresh the session
    await fetch('/api/auth/session', {
      method: 'GET',
      cache: 'no-store'
    });

    // Trigger a session update event
    const event = new Event('visibilitychange');
    document.dispatchEvent(event);

    return true;
  } catch (error) {
    console.error('Failed to refresh session:', error);
    return false;
  }
};

export const forceSessionUpdate = () => {
  // Force NextAuth useSession hook to refresh
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('focus'));
  }
};
