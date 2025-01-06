
export class apiFeature {
    constructor(mongooseQuery , queryString){
        this.mongooseQuery = mongooseQuery,
        this.queryString = queryString
    }

    paginate(){
        let page = this.queryString.page * 1 || 1
        if(page <= 0) page = 1
        let skip = (page - 1) * 10
        this.page = page
        this.mongooseQuery.skip(skip).limit(10)
        return this
    }

    filter(){
        let filter = {...this.queryString}
        let exclude = ['sort' , 'page' , 'keyword' , 'fields']
        exclude.forEach((q)=>{
            delete filter[q]
        })
        filter = JSON.stringify(filter)
        filter = filter.replace(/\b(gt|gte|lt|lte)\b/g , (match)=> `$${match}`)
        filter = JSON.parse(filter)
        this.mongooseQuery.find(filter)
        return this
    }
    sort(){
        if(this.queryString.sort){
            let sortBy = this.queryString.sort.split(',').join(' ')
            this.mongooseQuery.sort(sortBy)
        }
        return this
    }

    search(){
        if(this.queryString.keyword){
            this.mongooseQuery.find({
                $or:[
                    {
                        location:{
                            $regex:this.queryString.keyword,
                            $options: 'i'
                        }
                    },
                    {
                        discription:{
                            $regex:this.queryString.keyword,
                            $options: 'i'
                        }
                    },
                    {
                        area:{
                            $regex:this.queryString.keyword,
                            $options: 'i'
                        }
                    },
                    {
                        type:{
                            $regex:this.queryString.keyword,
                            $options: 'i'
                        }
                    }
                ]
            })
        }
        return this
    }

    fields(){
        if(this.queryString.fields){
            let fields = this.queryString.fields.split(',').join(' ')
            this.mongooseQuery.select(fields)
        }
        return this
    }
}
