import React, { memo } from 'react'
import { Map, Marker, NavigationControl, InfoWindow } from 'react-bmapgl'

import { MapWrapper } from './style'

const CampusMap = memo(() => {
  return (
    <MapWrapper>
      <h2>移通地图</h2>
      <Map
        enableScrollWheelZoom={true}
        enableTilt={true}
        mapType="normal"
        style={{ height: 600 }}
        center={{ lng: 106.246223, lat: 30.006867 }}
        zoom="11"
      >
        <Marker position={{ lng: 106.246223, lat: 30.006867 }} />
        <NavigationControl />
        <InfoWindow
          position={{ lng: 106.246223, lat: 30.006867 }}
          text="一所注重学科交叉融合的应用型大学"
          title="重庆移通学院"
        />
      </Map>
    </MapWrapper>
  )
})

export default CampusMap
