import styled from 'styled-components'
export const HomeWrapper = styled.div`
  .home {
    width: 90%;
    height: 498px;
    margin: 20px auto;
    display: flex;
    align-items: center;
    letter-spacing: 1px;
  }
  .news,
  .infos {
    flex: 1;
    flex-shrink: 0;
    padding: 6px 12px;
    background-color: #f5f5f5;
    border-radius: 2px;
    width: 50%;
  }
  .news {
    margin-right: 30px;
    .n-title {
      display: flex;
      align-items: center;
      height: 30px;
      justify-content: space-between;
      .left {
        color: #1976d2;
        font-size: 17px;
        font-weight: bold;
      }
    }
  }

  .infos {
    .in-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        color: #1976d2;
        font-size: 17px;
        font-weight: bold;
      }
    }
  }
`
