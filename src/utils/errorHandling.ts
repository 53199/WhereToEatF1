export function getGoogleMapsErrorMessage(error: any): string {
  if (typeof error === 'string' && error.includes('ApiNotActivatedMapError')) {
    return "L'API Places n'est pas activée. Veuillez l'activer dans votre console Google Cloud.";
  }
  
  if (typeof error === 'string' && error.includes('InvalidKeyMapError')) {
    return "La clé API Google Maps n'est pas valide.";
  }

  return "Une erreur est survenue. Veuillez vérifier votre configuration Google Maps.";
}