import SceneryList from '@/components/scenery-list'
import { getSceneryReq } from '@/service/modules/scenery'
import React, { memo, useCallback, useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import { SceneryWrapper } from './style'
import AddScenery from './c-cpns/add-scenery'
import { isAdmin } from '@/utils/isAdmin'
import { localCache } from '@/utils/cache'

const Scenery = memo(() => {
  const [page, setPage] = useState(localCache.getCache('scenery_page') ?? 1)
  const [totalCount, setTotalCount] = useState(0)
  const [data, setData] = useState([])
  const [addOpen, setAddOpen] = useState(false)

  useEffect(() => {
    fetchSceneryData(page)
  }, [page])
  const fetchSceneryData = useCallback((current: number) => {
    getSceneryReq(current, 3).then((res) => {
      setData(res.data.result)
      setTotalCount(res.data.totalCount)
    })
  }, [])

  useEffect(() => {
    return () => {
      localCache.setCache('scenery_page', page)
    }
  }, [page])

  return (
    <SceneryWrapper>
      {/* 添加校园风光 */}
      <AddScenery open={addOpen} setOpen={setAddOpen} page={page} fetchData={fetchSceneryData} />

      <div className="s-title">
        <span>校园风光</span>
        {isAdmin() ? (
          <Button
            onClick={() => setAddOpen(true)}
            size="small"
            style={{ background: '#94dec7', color: '#fff' }}
          >
            添加校园风光
          </Button>
        ) : (
          ''
        )}
      </div>
      <SceneryList
        data={data}
        fetch={fetchSceneryData}
        page={page}
        setPage={setPage}
        totalCount={totalCount}
      ></SceneryList>
    </SceneryWrapper>
  )
})

export default Scenery
