import "./styles/app.css";
import { StudentLogic } from './business/student_logic';
import { store } from "./store";

const studentLogic = new StudentLogic(store);
studentLogic.refreshStudentList();