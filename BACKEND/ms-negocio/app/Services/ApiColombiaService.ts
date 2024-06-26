import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

class ApiColombiaService {
  public static async getDepartments(): Promise<any> {
    try {
      const response = await axios.get(`${Env.get('ApiColombia')}/Department`)
      return response.data
    } catch (error) {
      throw new Error('Error fetching departments: ' + error.message)
    }
  }

  public static async getCitiesByDepartment(departmentId: string): Promise<any> {
    try {
      const response = await axios.get(
        `${Env.get('ApiColombia')}/Department/${departmentId}/cities`
      )
      return response.data
    } catch (error) {
      throw new Error(`Error fetching cities for department ${departmentId}: ` + error.message)
    }
  }

  public static async getCityById(cityId: number, departmentId: number): Promise<any> {
    try {
      // Obtener información detallada sobre la ciudad
      const response = await axios.get(`${Env.get('ApiColombia')}/City/${cityId}`)
      const cityData = response.data

      // Verificar si la ciudad pertenece al departamento dado
      if (cityData.departmentId !== departmentId) {
        throw new Error(`City with ID ${cityId} does not belong to department ${departmentId}`)
      }

      return cityData
    } catch (error) {
      throw new Error(`Error fetching city with ID ${cityId}: ` + error.message)
    }
  }

  public static async getDepartmentAndCityNames(departmentId: number, cityId: number) {
    try {
      const [departments, city] = await Promise.all([
        ApiColombiaService.getDepartments(),
        ApiColombiaService.getCityById(cityId, departmentId),
      ])

      const department = departments.find((d: any) => d.id === departmentId)
      if (!department) throw new Error('Department not found')

      return { departmentName: department.name, cityName: city.name }
    } catch (error) {
      throw new Error('Error fetching department or city name: ' + error.message)
    }
  }
}

export default ApiColombiaService
