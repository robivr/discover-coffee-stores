import { useState } from 'react'

const useTrackLocation = () => {
  const [locationErrorMsg, setLocationErrorMsg] = useState('')
  const [latLong, setLatLong] = useState('')
  const [isFindingLocation, setIsFindingLocation] = useState(false)

  const success = (position: GeolocationPosition) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude

    setLatLong(`${latitude},${longitude}`)
    setLocationErrorMsg('')
    setIsFindingLocation(false)
  }

  const error = () => {
    setLocationErrorMsg('Unable to retrive your location')
    setIsFindingLocation(false)
  }

  const handleTrackLocation = () => {
    setIsFindingLocation(true)

    if (!navigator.geolocation) {
      setLocationErrorMsg('Geolocation is not supported by your browser')
    } else {
      navigator.geolocation.getCurrentPosition(success, error)
    }
  }

  return {
    latLong,
    locationErrorMsg,
    isFindingLocation,
    handleTrackLocation,
  }
}

export default useTrackLocation
