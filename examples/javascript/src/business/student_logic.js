import * as $ from 'jquery';

export class StudentLogic {

    constructor(store) {
        this.registerEvents_();
        this.store = store;
    }

    registerEvents_() {
        // add button
        $('#divContainer').on('click', 'td .btn-add', () => {
            this.addStudent();
        });
        // edit button
        $('#divContainer').on('click', 'td .btn-edit', (el) => {
            const id = $(el.target).parents('tr').attr('data-id');
            this.editStudent(Number(id));
        });
        // delete button
        $('#divContainer').on('click', 'td .btn-delete', (el) => {
            const id = $(el.target).parents('tr').attr('data-id');
            this.deleteStudent(Number(id));
        });

        $('#divContainer').on('click', 'td .btn-update', (el) => {
            const id = $(el.target).parents('tr').attr('data-id');
            this.updateStudent(Number(id));
        });

        $('#divContainer').on('click', 'td .btn-add-cancel', (el) => {
            const row = $(el.target).parents('tr');
            row.find('input').val('');
        });

        $('#divContainer').on('click', 'td .btn-update-cancel', (el) => {
            this.refreshStudentList();
        });

    }

    getRowWithTextbox(student) {
        return `<tr class=${student ? "tr-edit" : "tr-add"} data-id=${student ? student.id : ""}>
                    <td><input type="text" value=${student ? student.name : ""}></td>
                    <td><input type="text" value=${student ? student.gender : ""}></td>
                    <td><input type="text" value=${student ? student.country : ""}></td>
                    <td><input type="text" value=${student ? student.city : ""}></td>
                    <td>
                        <button class=${student ? "btn-update" : "btn-add"}>${student ? "Update" : "Add"}</button>
                    </td>
                    <td>
                    <button class=${student ? "btn-update-cancel" : "btn-add-cancel"}>${student ? "Cancel" : "Clear"}</button>
                    </td>
                </tr>`;
    }

    async deleteStudent(studentId) {

        try {
            this.store.set("deleteStudent", studentId);
            const row = $("#tblStudents tbody tr[data-id='" + studentId + "']");
            row.remove();
        }
        catch (err) {
            alert(err.message);
        }
    }

    async updateStudent(studentId) {
        const columns = $("#tblStudents tbody tr[data-id='" + studentId + "']").find('td');
        const updatedValue = {
            id: studentId,
            name: columns[0].querySelector('input').value,
            gender: columns[1].querySelector('input').value,
            country: columns[2].querySelector('input').value,
            city: columns[3].querySelector('input').value
        };

        try {
            this.store.set("updateStudent", updatedValue);
            ($("#tblStudents tbody tr[data-id='" + studentId + "']")[0]).outerHTML =
                this.getHtmlRow(updatedValue);
        }
        catch (err) {
            alert(err.message);
        }
    }

    async addStudent() {
        const columns = document.querySelectorAll('.tr-add td');
        const student = {
            name: columns[0].querySelector('input').value,
            gender: columns[1].querySelector('input').value,
            country: columns[2].querySelector('input').value,
            city: columns[3].querySelector('input').value
        };
        try {
            this.store.do("addStudent", student);
            this.refreshStudentList();
            alert('successfully added');
        }
        catch (err) {
            console.error(err);
            alert(err.message);
        }
    }

    async editStudent(studentId) {

        try {
            const student = this.store.eval("studentById")(studentId);
            if (student) {
                const row = $("#tblStudents tbody tr[data-id='" + studentId + "']")[0];
                row.outerHTML = this.getRowWithTextbox(student);
            }
        }
        catch (err) {
            alert(err.message);
        }
    }

    async refreshStudentList() {
        try {
            const results = await this.store.get("students");
            const tableBody = document.querySelector('#tblStudents tbody');
            let html = this.getRowWithTextbox();
            results.forEach(student => {
                html += this.getHtmlRow(student);
            });
            tableBody.innerHTML = html;
        }
        catch (err) {
            console.error(err);
            alert(err.message);
        }
    }

    getHtmlRow(student) {
        return `<tr data-id=${student.id}>
            <td>${student.name}</td>
            <td>${student.gender}</td>
            <td>${student.country}</td>
            <td>${student.city}</td>
            <td><button class="btn-edit">Edit</button></td>
            <td><button class="btn-delete">Delete</button></td>
            </tr>`;
    }

}