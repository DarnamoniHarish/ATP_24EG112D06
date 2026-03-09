class Book
{
    title;
    author;
    pages;
    isavailable=true;
    constructor(title,author,pages,isavailable){
        this.title=title
        this.author=author
        this.pages=pages
        this.isavailable=isavailable
    }
    borrow(){
        if(!this.isavailable)
        return "unavailable";
    }
    returnBook(){
       if (this.isavailable)
        return "Available"
    }
    getInfo(){
        return (`${this.title} is by ${this.author} of pages ${this.pages}`)
    }
    isLongBook(pages)
    {
        if(this.pages>300)
            return true
        else 
            return false 
    }
}
let b1=new Book("The Hobbit","J.R.R Tolkien",310)
let b2=new Book("The HarryPotter","Hari",260)
let b3=new Book("The Book","Naveen",160,false)
let b4=new Book("The ATP","Ravi",360)
let b5=new Book("The IT","Bhanu",70,false)
//console.log(b3)
console.log(b1.getInfo())
console.log(b2.getInfo())
console.log(b3.getInfo())
console.log(b4.getInfo())
console.log(b5.getInfo())
console.log(b3.borrow())
console.log(b4.borrow())
