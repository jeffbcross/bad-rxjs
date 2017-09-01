# Anti-Patterns in RxJS

This is the repository demonstrating RxJS Anti-Patters; discussed on a [YouTube live-coding session](https://www.youtube.com/watch?v=Q0eYsUANXgk&t=3s).

The Angular application (here in the repository) uses a Cloud service to access ipsum-lorem type posts and author details. The UX - while underwhelming - demonstrates a classic **master-details** UI application implemented using Angular Http and RxJs Observables.

![posts-to-detail](https://user-images.githubusercontent.com/210413/29985877-8c15dfbc-8f26-11e7-9fe8-3a4d1dfc72a7.jpg)

### Scenario

The complication here is that the lists of posts do NOT contain author information. So for each post entry, author information mus be also retrieved. This aggregated information is then displayed in the `posts.component.ts` view.

With 9 Refactoring steps, developers can see how Angular UI components can become **presentation-only** components and use observable-based service APIs.

## Exploring the Code

The initial code implemented demonstrates a plethora of bad practices and many RxJS anti-patterns. The code can be easily explored using the commit history or using the following table-of-contents:


|  Step |  Git |
|-----|------|
| step(0): expand 'bad' logic for easy consumption     | `git checkout 2892e4f` |
| step(1): show raw posts immediately                  | `git checkout a75c024` |
| step(2): use async pipe, remove subscribes           | `git checkout 74e32c0` |
| step(3): remove all subscribes, mergeMap             | `git checkout dbbcf7c` |
| step(4): refactor post/user logic to PostService     | `git checkout 5268425` |
| step(5): condense post service                       | `git checkout 3ffa635` |
| step(6): fix router view pooling with post details   | `git checkout 7cbc74d` |
| step(7): condense post detail logic using async pipe | `git checkout e1b7d4e` |
| step(8): central rxjs operator imports               | `git checkout e19e879` |

<br/>

To explore the tutorials, simply `git checkout <SHA>` the step you would like to review.

```bash
git checkout 3ffa635  # Review fixes in Step#5
```

> Each step/commit shown above ^ has fixes or improvements to the previous step.
 
----

## Development server

*  Run `ng serve` for a dev server. 
*  Navigate to `http://localhost:4200/`. 

> The app will automatically reload if you change any of the source files.

## Resources

*  http://reactivex.io/
*  http://rxmarbles.com/
*  https://github.com/staltz/rxmarbles
*  https://www.learnrxjs.io/operators/combination/forkjoin.html
*  https://egghead.io/courses/save-time-avoiding-common-mistakes-using-rxjs
