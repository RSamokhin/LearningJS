;(function() {

    // Используется для получения внутреннего `[[Class]]` значений
    var toString = Object.prototype.toString;

    // Используется для получения декомпилированного кода функций
    var fnToString = Function.prototype.toString;

    // Используется для определения родительских конструкторов (Safari > 4; специфично для типизированных массивов)
    var reHostCtor = /^\[object .+?Constructor\]$/;

    // Создадим регулярное выражение используя в качестве шаблона общедоступный нативный метод.
    // Мы выбрали `Object#toString` потому что его, скорее всего, не изменяли.
    var reNative = RegExp('^' +
        // Принудительно переводим `Object#toString` в строку
        String(toString)
        // Экранируем все специальные символы регулярного выражения
            .replace(/[.*+?^${}()|[\]\/\\]/g, '\\$&')
            // Заменяем все упоминания `toString` на `.*?` для поддержания обобщённого вида.
            // Заменяем конструкции типа `for ...`, что бы поддерживать окружения
            // вроде Rhino, который добавляет дополнительную информацию (например, арность).
            .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
    );

    function isNative(value) {
        var type = typeof value;
        return type == 'function'
            // Используем `Function#toString` что бы обойти собственный
            // метод `toString` value и не дать нас обмануть.
            ? reNative.test(fnToString.call(value))
            // Проверяем родительский объект, так как некоторые окружения представляют
            // штуки вроде типизированных массивов в виде DOM методов, что может
            // не соответствовать нормальному нативному шаблону
            : (value && type == 'object' && reHostCtor.test(toString.call(value))) || false;
    }

    // Экспортируете то, что сочтёте нужным
    module.exports = isNative;
}());

// Пример использования
isNative(alert); // true
isNative(myCustomFunction); // false