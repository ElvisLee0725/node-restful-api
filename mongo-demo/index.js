const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// Use Mongoose to define schema
const courseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        // match: /pattern/   Use Regex to validate the input name
        minlength: 5,
        maxlength: 255
    },
    catagory: {
        type: String,
        required: true,
        lowercase: true,    // Converting to lowercase
        trim: true,         // Removing padding
        enum: ['web', 'mobile', 'network']  // The catagory must match those pre-defined here.
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,  // When the validator is asynchronous
            validator: function(v, callback) {
                setTimeout(() => {
                    const res = v && v.length > 0;  // Prevent the input is an empty array
                    callback(res);
                }, 4000);
            },
            message: 'A course should have at least one tag.'   // Optional message to show when validation failed
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() {
            return this.isPublished;
        },
        min: 10,
        max: 200
    }
});

// Compile the schema into a model, then create a class
// In .model(), the 1st argument is the singular name of the collection, 2nd is schema
const Course = mongoose.model('Course', courseSchema);

async function createCrouse() {
    const course = new Course({
        name: 'Angular Course',
        catagory: 'a',
        author: 'Elvis',
        tags: [],
        isPublished: true,
        price: 15
    });

    try {
      // The save operation is aschyncronous, so its return is a Promise.
        const result = await course.save();
        console.log(result);  
    }
    catch(ex) {
        for( field in ex.errors) {
            console.log(ex.errors[field].message);
        }
    }   
}

createCrouse();

async function getCourses() {
    // Comparison Operator
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)

    // Logical Operator
    // .and()
    // .or()
    const courses = await Course
        .find({ author: 'Elvis', isPublished: true})
        .limit(10)
        .sort({ name: 1 })  // 1 is ascending, while -1 is decending
        .select({ name: 1, tags: 1 })
        .count();   // Output total numbers of result
    console.log(courses);
}

// getCourses();


async function updateCourse(id) {
    // Method 1: Retrieving the data first, then update and save it
    // const course = await Course.findById(id);
    // if(!course) return ;
    
    // course.isPublished = true;
    // course.author = 'New Author';

    // const res = await course.save();
    // console.log(res);

    // Method 2: Update the data directly without retrieving it
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Peter',
            isPublished: true
        }
    }, { new: true });  // { new: true } return the updated course object
    console.log(course);
}

// updateCourse('5d94f18fadc6011d14576a94');

async function removeCourse(id) {
    // const res1 = await Course.deleteOne({ _id: id });
    // const res2 = await Course.deleteMany({ isPublished: false });
    const courseDeleted = await Course.findByIdAndRemove(id);
    console.log(courseDeleted);
}
// removeCourse('5d965ffe19187f5ea080e327');