![nrwl_consulting](https://user-images.githubusercontent.com/210413/30003266-2fc2b568-9080-11e7-9ef5-94c8b9841331.jpg)

<br/>

# Anti-Patterns in RxJS

This is the repository demonstrating RxJS Anti-Patters; discussed on a [YouTube live-coding session](https://www.youtube.com/watch?v=Q0eYsUANXgk&t=3s).

<a href="https://www.youtube.com/watch?v=Q0eYsUANXgk&t=3s" target="_blank">
  <img src="https://user-images.githubusercontent.com/210413/29990908-00014434-8f45-11e7-9a77-f01adf16fa75.jpg" style="width:100%">
</a>

<br/>

### Demo Application

The Angular application (here in the repository) uses a Cloud service to access ipsum-lorem type posts and author details. The UX - while underwhelming - demonstrates a classic **master-details** UI application implemented using Angular Http and RxJs Observables.

<br/>

![posts-to-detail](https://user-images.githubusercontent.com/210413/29985877-8c15dfbc-8f26-11e7-9fe8-3a4d1dfc72a7.jpg)


### Scenario

The complication here is two (2) RESTful services that must be used. 

The lists of posts do NOT contain author information. So for each post entry, author information mus be also retrieved. This aggregated information is then displayed in the `posts.component.ts` view. 

> These issues present both UX and RxJS chaining challenges!

A a training exercise, these issues are address with ten (10) refactoring steps. Developers can see how Angular UI components are transformed into **presentation-only** components which consume **observable-based** service APIs.

<br/>

## Exploring the Code

The initial code was intentionally implemented with a plethora of common, bad practices and RxJS anti-patterns. 

The commits in this repository show incremental improvements to the application and best-practices for using RxJS in Angular applications.

Developers can explore the changes in two (2) ways:

* View the changes online in the commit log
* Checkout the commit on a local clone of the repository

<br/>

### View Online


Use this link to learn how to [Use Commit Logs to Explore Changes Online](https://youtu.be/eYuM6qRENy4)
<div style="text-align: center">

  <a href="https://youtu.be/eYuM6qRENy4" target="_blank" alt="YouTube Video: Using Commit Logs to Explore Changes">
    <img src="https://user-images.githubusercontent.com/210413/30006911-b63b7934-90c8-11e7-8f92-f3065f2abc17.png" style="width:50%">
  </a>
</div>


<br/>
<br/>

### Checkout the Commits 

Here is a Table of Contents for the Tutorial changes.

<br/>

|  Step |  Git Command |
|-----|------|
| step(1): expand 'bad' logic for easy consumption     | `git checkout 0f8d304` |
| step(2): show raw posts immediately                  | `git checkout 4cd0d74` |
| step(3): use `async` pipe, remove subscribes           | `git checkout f01c9f4` |
| step(4): remove all subscribes, mergeMap             | `git checkout ddf32ef` |
| step(5): refactor post/user logic to PostService     | `git checkout 66a1d8a` |
| step(6): condense post service                       | `git checkout 1cb1762` |
| step(7): fix router view pooling with post details   | `git checkout c2f5b32` |
| step(8): condense post detail logic using async pipe | `git checkout 2b9aa6a` |
| step(9): central rxjs operator imports               | `git checkout 613b544` |
| step(10): use `.do()` operator for event side effects     | `git checkout ff7bbb7` |

<br/>

Each step/commit shown above (^) has fixes or improvements to the previous step.

Simply use a terminal command `git checkout <SHA>` to checkout a tutorial step you would like to explore.

```bash
git checkout 3ffa635  # Review fixes in Step#5
```

<br/>

And to quickly get a pretty list of commits for your local, cloned repository, use this command:

```base
git log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --
```

<br/><br/>

## Development server

*  Run `ng serve` for a dev server. 
*  Navigate to `http://localhost:4200/`. 

>  The app will automatically reload if you change any of the source files.

## Resources

*  http://reactivex.io/
*  http://rxmarbles.com/
*  https://github.com/staltz/rxmarbles
*  https://www.learnrxjs.io/operators/combination/forkjoin.html
*  https://egghead.io/courses/save-time-avoiding-common-mistakes-using-rxjs
