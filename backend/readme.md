If a helper is only used inside Call, then put it i
ex 
src/
  application/
    usecases/
      Call/
        helpers/
          callValidator.ts
---------------------------------
other ways
src/
  application/
    helpers/
      passwordHelper.ts
      tokenHelper.ts
      dateHelper.ts

---------------------------
Skill	                  Action
Architecture	          Study Clean Architecture, DDD, and Hexagonal patterns
Code Quality	          Practice writing unit tests, use linters, follow naming conventions
Documentation	          Write README files, comment complex logic, explain folder structures
Collaboration	          Review others’ code, ask for feedback, mentor juniors when possible
Thinking	Always ask:  “Will this scale? Is this readable? Is this testable?”