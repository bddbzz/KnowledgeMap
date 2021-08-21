//聊天室有多个房间、多个用户，每个用户可以查看所有的房间，但是只对设定的房间有进入权限，用户对房间的权限有两种（进入open，查看see）。请完成如下代码。

//用户类,字段/属性/方法可以自由定义
class User {
    constructor(id, name) {
        this.id = id
        this.name = name
        this.permissionMap = new Map()
    }
    setPermission(room, permission) {
        this.permissionMap.set(room.id, permission)
    }
    getPermission(room) {
        return this.permissionMap.get(room.id)
    }
    open(room) {
        const permission = this.getPermission(room)
        if (permission === 'open') {
            console.log(`${this.name} opened room ${room.name} successfully.`)
        } else {
            console.log(`${this.name} opened room ${room.name} failed.`)
        }
    }
}
//房间类,字段/属性/方法可以自由定义
class Room {
    constructor(id, name) {
        this.id = id
        this.name = name
    }
}
//场景类
class ChatRoom {
    static main() {
        const userA = new User(1, 'Jaycee')
        const userB = new User(2, 'Danny')
        const roomA = new Room(1, 'A')
        const roomB = new Room(2, 'B')

        userA.setPermission(roomA, 'open')
        userB.setPermission(roomB, 'see')

        //userA有roomA权限，打印Jaycee opened room A successfully.
        userA.open(roomA)

        //userB没有roomB权限，打印Danny opened room B failed.
        userB.open(roomB)
    }
}
ChatRoom.main()
