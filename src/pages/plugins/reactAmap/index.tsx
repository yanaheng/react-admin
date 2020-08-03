import React, { useState } from 'react';
import { Map, Marker } from 'react-amap';
import { Select } from 'antd';
import { PushpinOutlined } from '@ant-design/icons'
import styles from './index.less'

const { Option } = Select
const AMAPKEY = '788e08def03f95c670944fe2c78fa76f'

export default () => {
  // 搜索地点结果
  const [placeOptions, setPlaceOpt] = useState([])
  // autoComplete实例引用
  const [autoComplete, setAutoComplete] = useState(null)
  // 选中搜索地点后，给该点添加marker
  const [markers, setMarkers] = useState(null)
  // map实例引用
  const [map, setMap] = useState(null)

  // 地图加载的插件列表
  const plugins = [
    'Scale',  // 比例尺
    'ToolBar' // 缩放工具
  ]

  // 地图事件
  const amapEvents = {
    created: (mapInstance: any) => {
      setMap(mapInstance)
      console.log('高德地图 Map 实例创建成功；如果你要亲自对实例进行操作，可以从这里开始.');
      AMap.plugin('AMap.Autocomplete', function () {
        // 实例化Autocomplete
        var autoOptions = {
          //city 限定城市，默认全国
          city: '全国'
        }
        // 为输入提示赋值实例，以便自定义组件能够使用实例上的方法
        setAutoComplete(new AMap.Autocomplete(autoOptions))
      })
    }
  };

  // 搜索地点
  const searchPlace = value => {
    if (value) {
      autoComplete.search(value, function (status, result) {
        // 搜索成功时，result即是对应的匹配数据
        if (status === 'complete')
          setPlaceOpt(result.tips)
      })
    }
  }

  return (
    <div className={styles.mapContainer}>
      <Map
        className={styles.map}
        amapkey={AMAPKEY} // 高德地图给开发者分配的开发者 Key
        plugins={plugins}   // 提供要加载的插件列表
        events={amapEvents}
      >
        <Select
          showSearch
          placeholder='搜索位置、公交站、地铁站'
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          className={styles.searchBtn}
          onSearch={searchPlace}
          notFoundContent={null}
          onSelect={(value, opt)=>{
            const position = {
              longitude: opt.location.lng,
              latitude: opt.location.lat
            }
            map.setFitView();
            setMarkers(<Marker key={opt.key} position={position} />)
          }}
        >
          {placeOptions.map(d => (
            <Option 
              key={d.adcode + d.typecode} 
              value={d.adcode}
              {...d}
            >
              <PushpinOutlined /> {d.district + d.name}
            </Option>
          ))}
        </Select>
        {markers}
      </Map>
    </div>
  )
}