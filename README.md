# godam

Modular & reactive state management framework.

> Godam is Hindi word which means godown. The architecture of the framework is similar to godown.

# Architecture

Godam is like a warehouse, where you store all your information. It has rooms which can be used to store data of particular type.

# Installation

```
npm i godam
```

# Framework support 

Godam is very generic store framework, which can be used in any front end or backend framework. 

We have created official plugin support for below library or frameworks - 

* React - https://github.com/ujjwalguptaofficial/godam-react
* Vue - https://github.com/ujjwalguptaofficial/godam-vue

# Docs

Godam has five important parts - 

* State
* Mutation
* Expression
* Task
* Room

## State

State can be used to store the value.

### Create state

```
class MyState{

    constructor(){
        this.name = "Ujjwal Gupta"
    }

}
```

```
import {Godam} from "godam";

const myStore = new Godam({
    state : MyState
})
```

### Get state from store

```
myStore.get('name');
```

## Mutation

Mutation can be used to mutate(change) the state value. Mutation is always synchronous and do not return any result.

### Create mutation

```
import { Godam, Mutation} from "godam";

class MyMutation extends Mutation{

    name(value){
        this.state.name = value;
    }
}
```

```
import {Godam} from "godam";

const myStore = new Godam({
    state : MyState,
    mutation: MyMutation,
})
```

### Use mutation

```
myStore.set('name', 'Ujjwal kr gupta');

```

## Expression

Expression can be used to derive a value from state.

### Create expression

```
import { Godam, Expression} from "godam";

class MyExpression extends Expression {

    get nameLength() {
        return this.get('name').length;
    }

    nameWithPrefix(prefix){
        return prefix + this.get('name')
    }
}
```

```
import {Godam} from "godam";

const myStore = new Godam({
    state : MyState,
    mutation: MyMutation,
    expression: MyExpression
})
```

### Use expression

```
myStore.eval('nameLength');
myStore.eval('nameWithPrefix', 'hello');
```

## Computed

Computed are expressions which are cached. So they will be called only when state changes. 

Computed can be used to increase performance.

> Computed can not accept parameters.

### Create computed

```
import { Godam, Expression} from "godam";

class MyExpression extends Expression {

    // nameLength will be called only name is changed
    @Computed('name')
    get nameLength() {
        return this.get('name').length;
    }
}
```

or

```
import { Godam, Expression} from "godam";

class MyExpression extends Expression {

    constructor(){
        this.markComputed("nameLength", 'name');
    }

    get nameLength() {
        return this.get('name').length;
    }
}
```

## Task

Any logic which requires lots of store manipulation can be created as task. A Task has access to - `state` , `mutation`, `expression`.

Task can be made asychronous by returning promise.

### Create task

```
import {Task} from "godam";

class MyTask extends Task {

    saveInfo(name){
        const savedName = this.get('name');
        if(name!=savedName){
            this.set('name', name);
        }
        const payload = {
            name : name,
            count: this.eval('nameCount')
        }
    }
}
```

```
import {Godam} from "godam";

const myStore = new Godam({
    state : MyState,
    mutation: MyMutation,
    expression: MyExpression,
    task: MyTask
})
```

### Use task

```
myStore.do('saveInfo', 'hello world');
```

## Room

Room can be used to modularized the store.

### Create Room

```
import { Godam, Mutation, Room } from "godam";

class AccountState {
    id = ""
}

class AccountMutation extends Mutation{
    id(value) {
        this.state.id = value;
    }
}

const accountRoom = new Room({
    state: AccountState,
    mutation: AccountMutation
})
```

```
const myStore = new Godam({
    state : MyState,
    mutation: MyMutation,
    expression: MyExpression,
    task: MyTask,
    rooms: {
        account: accountRoom
    }
})
```

### Access room

#### State

```
myStore.get('id@account');
```

#### Mutation

```
myStore.set('id@account', 1);
```

#### Expression

```
myStore.eval('<expression name>@<room>');
```

#### Task

```
myStore.do('<task name>@<room>');
```