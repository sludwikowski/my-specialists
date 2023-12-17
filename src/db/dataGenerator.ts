import namesData from './data/names.json'
import specializationData from './data/specializations.json'
import avatarData from './data/avatars.json'

export const generateDataIfNeeded = async () => {
  const storedData = JSON.parse(localStorage.getItem('specialistsData'))

  if (!storedData) {
    const data = []
    for (let i = 0; i < 7000; i++) {
      data.push({
        id: i,
        name: namesData[Math.floor(Math.random() * namesData.length)],
        specialization: specializationData[Math.floor(Math.random() * specializationData.length)],
        avatar: avatarData[Math.floor(Math.random() * avatarData.length)],
      })
    }
    localStorage.setItem('specialistsData', JSON.stringify(data))
    return data
  }
  return storedData
}
