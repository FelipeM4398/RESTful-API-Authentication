/**
 * Retorna la url de un avatar con las iniciales del nombre y apellido
 * @param name
 * @param lastName
 * @returns string
 */
export default function picture(name: string, lastName: string): string {
  return `https://i1.wp.com/cdn.auth0.com/avatars/${name[0].toLowerCase()}${lastName[0].toLowerCase()}.png`;
}
