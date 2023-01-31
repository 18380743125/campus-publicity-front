import styled from 'styled-components'

export const ListWrapper = styled.div`
  .item {
    display: flex;
    align-items: center;
    height: 57px;
    box-sizing: border-box;
    border-bottom: 1px dotted #999;
    .time {
      display: flex;
      align-items: center;
      color: #1976d2;
      width: 80px;
      height: 100%;
    }
    .text {
      flex: 1;
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
      &:hover {
        color: red;
      }
    }
  }
`
