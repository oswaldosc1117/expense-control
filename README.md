# Control de Gastos con Context API

El proyecto consiste en un planificador de gastos elaborado con React, TypeScript, useReducer, Context API, Tailwind y Vite.

Adicionalmente, emplea dependencias como:
- "@headlessui/react": "^1.7.19",
- "@heroicons/react": "^2.1.3",
- "react-circular-progressbar": "^2.1.0",
- "react-date-picker": "^10.6.0",
- "react-swipeable-list": "^1.9.3",
- "uuid": "^9.0.1"

Al ingresar, te pedirá que ingreses un monto el cual será el presupuesto sobre el cual vas a manejar tus gastos. Una vez ingresado, Te mostrara una gráfica que se actualizará en tiempo real con los gastos que ingreses, así como el presupuesto total, el presupuesto disponible y el presupuesto gastado.

Seguidamente podrás filtrar los gastos por categoría y finalmente la sección donde se reflejan los gastos. En la esquina inferior derecha hay un signo de "+" donde podras añadir tus gastos (esta parte tiene validación, por lo que no podrás ingresar el formulario vacío). Una vez ingresado, se mostrará em la sección inferior. En caso de que los gastos superen el presupuesto inicial, tambien ingresará otra validación.

Gracias a la dependencia de swipeable-list de React, para actualizar o eliminar algunos de los gastos, solo es necesario deslizar el gasto ingresado hacia la izquierda (actualizar) o hacia la derecha (para eliminar).

Igualmente, implementa LocalStorage, por lo que la información ingresada no se perderá.

Finalmente, en la parte superior, se encuentra un botón para reiniciar la aplicación una vez se quiera introducir un nuevo presupuesto.

El proyecto se encuentra alojado en Netlify.

Enlace: https://merry-blancmange-33e347.netlify.app/
