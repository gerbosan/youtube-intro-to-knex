class Todos {
    constructor(id: Number, title: String, completed: Boolean, created_at, updated_at, user_id: Number) {
        this.id = id;
        this.title = title;
        this.completed = completed;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.user_id = user_id;
    }

    get id() {
        return this.id;
    }

    set id(id) {
        this.id = id;
    }

    get title() {
        return this.title;
    }

    set title(title) {
        this.title = title;
    }

    get completed() {
        return this.completed;
    }

    set completed(completed) {
        this.completed = completed
    }

    get created_at() {
        return this.created_at;
    }

    set created_at(created_at) {
        this.created_at = created_at;
    }

    get updated_at() {
        return this.updated_at;
    }

    set updated_at(updated_at) {
        this.updated_at = updated_at;
    }

    get user_id() {
        return this.user_id;
    }
    
    set user_id(user_id) {
        this.user_id = user_id;
    }
}

export default Todos;