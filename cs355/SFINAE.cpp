#include <iostream>
#include <typeinfo>
#include <type_traits>
#include <climits>

typedef unsigned char byte;

template <typename T>
class CheckSerialize {
    typedef char Small;
    struct Big { char x[2]; };
public:
    // Check for serialize
    template <typename U> static Small test(decltype(&U::serialize));
    
    // Check otherwise
    template <typename U> static Big test(...);
    
    // Store Values
    enum {
        Yes = (sizeof(test<T>(0)) == sizeof(Small)),
        No = !Yes
    };
};


// Foo class with a serialize
class Foo {
    int x;
public:
    Foo(int x_) : x(x_) {}

    void serialize(std::ostream& os) {
        os << "Foo: " << x;
        os << '\n';
    }
};


class Bar {
public:
    int x = 0;
};


// General Purpose serialize
template <typename T, typename std::enable_if<CheckSerialize<T>::No, T>::type* = nullptr>
void serialize(std::ostream& os, T& obj)  {
    byte *c = reinterpret_cast<byte *>(&obj);

    for (unsigned i = 0; i < sizeof(T); ++i) {
        os << (int)c[i] << ", ";
    }
    os << '\n';
}

template <typename T, typename std::enable_if<CheckSerialize<T>::Yes, T>::type* = nullptr>
void serialize(std::ostream& os, T& obj)  {
    obj.serialize(os);
}


int main()
{
    Foo f(20);
    
    Bar b;
    
    serialize(std::cout, f);
    serialize(std::cout, b);

    return 0;
}

