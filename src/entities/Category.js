class Category{
    constructor(id, name){
        this.id = id;
        this.name = name;
    }
}

const categories = [
    new Category(1, "Art"),
    new Category(2, "History"),
    new Category(3, "Geography")
];

export default categories;