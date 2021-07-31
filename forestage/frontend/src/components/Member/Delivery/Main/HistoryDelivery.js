import React from 'react'

function HistoryDelivery() {
  return (
    <>
      <div className="history-content active">
        <div className="content-container">
          <div className="content-body">
            <table className="content-table">
              <thead>
                <tr>
                  <th>訂單編號</th>
                  <th>日期</th>
                  <th>狀態</th>
                  <th>更多</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>20210620001</td>
                  <td>2021/06/20</td>
                  <td>已完成</td>
                  <td>
                    <i className="fas fa-eye"></i>
                  </td>
                </tr>
                <tr>
                  <td>20210630001</td>
                  <td>2021/06/30</td>
                  <td>已完成</td>
                  <td>
                    <i className="fas fa-eye"></i>
                  </td>
                </tr>
                <tr>
                  <td>20210715001</td>
                  <td>2021/07/15</td>
                  <td>已取消</td>
                  <td>
                    <i className="fas fa-eye"></i>
                  </td>
                </tr>
                <tr>
                  <td>20210718001</td>
                  <td>2021/08/18</td>
                  <td>已取消</td>
                  <td>
                    <i className="fas fa-eye"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default HistoryDelivery
