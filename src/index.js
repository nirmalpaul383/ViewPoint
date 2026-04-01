// This is project ViewPoint, a Math expression parser and evaluator with support of runtime data-type checking
// written in vanila JS. This is originally written by me (N Paul) (https://github.com/nirmalpaul383). ViewPoint
// is licensed under the GNU General Public License v3.0 (GPLv3). Additionally, while not legally required, I
// kindly request that if you use, modify, or distribute this project, please give credit to the original author
// name, Nirmal Paul (N Paul) (https://github.com/nirmalpaul383). I have dedicated significant time to developing
// this project, ensuring that every line of code is clean, well-structured, and easy to understand. Therefore, I
// would appreciate it if you acknowledge my name, Nirmal Paul (N Paul) (https://github.com/nirmalpaul383), as the
// original author when using or distributing this work. I appreciate your understanding and cooperation. You can
// download source files from my github profile https://github.com/nirmalpaul383 . 
// My YouTube Page: https://www.youtube.com/channel/UCY6JY8bTlR7hZEvhy6Pldxg/
// FaceBook Page: https://www.facebook.com/a.New.Way.Technical/
// GitHub Page: https://github.com/nirmalpaul383

import ViewPoint from "./core/ViewPoint.js";
import { mathOperations } from "./math/operations.js";
import { internalFunctions } from "./functions/internalFunctions.js";
import { externalFunctions } from "./functions/externalFunctions.js";
import { variablesDB } from "./variables/variables.js";

export {
  ViewPoint,
  mathOperations,
  internalFunctions,
  externalFunctions,
  variablesDB
};