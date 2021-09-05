import { Godam, Mutation, Task, Expression, Computed } from "godam";
import { Student } from "./model/student";

export class RootState {
    students: Student[] = [];
    studentId = 0;
}

export class RootMutation extends Mutation<RootState>{
    addStudent(student) {
        this.state.students.push(student);
    }

    deleteStudent(studentId) {
        const index = this.state.students.findIndex(q => q.id === studentId);
        if (index >= 0) {
            this.state.students.splice(index, 1);
        }
    }
    updateStudent(student) {
        const savedStudent = this.state.students.find(q => q.id === student.id);
        if (savedStudent) {
            Object.assign(savedStudent, student)
        }
    }

    studentId(value) {
        this.state.studentId = value;
    }
}

export class RootExpression extends Expression<RootState> {

    studentById() {
        return (studentId) => {
            return this.get("students").find(q => q.id === studentId);
        }
    }

    @Computed('students')
    get studentsLength() {
        return this.get('students').length;
    }
}

export class RootTask extends Task<RootState, RootMutation, RootExpression>{
    addStudent(student) {
        const newStudentId = this.get('studentId') + 1;
        student.id = newStudentId;
        this.set("addStudent", student);
        this.set("studentId", newStudentId);
    }
}

export const store = new Godam({
    state: RootState,
    mutation: RootMutation,
    expression: RootExpression,
    task: RootTask

})