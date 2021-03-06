import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'


class BoardItem extends React.Component {

  selectBoard() {
    const { board, selectBoard } = this.props
    selectBoard(board)
  }

  joinBoard() {
    const { board, currentUser, joinBoard } = this.props
    joinBoard(board, currentUser)
  }

  toDateString(date){
    let d = new Date(date)
    return d.toUTCString()
  }

  render() {
    const { board, currentUser, joinBoard, selectBoard, selectedBoard } = this.props
    const hasJoined = board.players.some(function(p){
      return currentUser._id === p.userId
    })
    const isOpen = !(board.whoIsPlaying && board.whoIsPlaying.userId)
    const isRunning = (board.whoIsPlaying && board.whoIsPlaying.userId) && !(board.winner && board.winner.userId)
    const isClosed = (board.winner && board.winner.userId)
    const canJoin = !hasJoined && isOpen
    const canViewBoard = selectedBoard._id !== board._id
    return (
      <Paper style={{marginRight: '10px', marginLeft: '-30px', padding: '5px'}}>
        Board created by { board.owner.name } on { this.toDateString(board.createdAt) } <br />
        { isOpen ? <span>OPEN &nbsp; &nbsp; &nbsp;</span> : isRunning ? <span>RUNNING </span> : isClosed ? <span>CLOSED &nbsp; &nbsp; &nbsp;</span> : null }
        { canViewBoard ? <span><FlatButton label='View' onClick={ this.selectBoard.bind(this) } secondary /></span> : <span>SHOWING</span>}
        { canJoin ? <FlatButton label='Join' onClick={ this.joinBoard.bind(this) } secondary /> : hasJoined ? <span>&nbsp; &nbsp; &nbsp; JOINED</span> : null }
      </Paper>
    )
  }
}

export default BoardItem
