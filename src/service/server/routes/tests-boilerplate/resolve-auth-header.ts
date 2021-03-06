function resolveAuthHeader(token: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
  };
}

export {
  resolveAuthHeader,
};
