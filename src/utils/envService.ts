export function getEnvironmentVariable(variableName: string) {
  if (import.meta.env.MODE === 'production') {
    return import.meta.env[`${variableName}_PROD`];
  } else if (import.meta.env.MODE === 'development') {
    return (
      import.meta.env[`${variableName}_LOCAL`]
    );
  }
}
