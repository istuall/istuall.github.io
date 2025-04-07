#include <fstream>
#include <iostream>
#include <string>
using namespace std;

#define MAXNUM 100

int n1 = 0, n2 = 0;
string l1[MAXNUM] = {};
string l2[MAXNUM] = {};
string out[MAXNUM] = {};

void File_create(string f) {
    ofstream outFile(f.c_str());
    if (outFile.is_open()) {
        outFile << f << "Create!" << endl;
        outFile.close();
    } else {
        cerr << "Unable to open file";
    }
}

void File_read(string f, string* l, int& n) {
    ifstream inFile(f.c_str());
    int i = 0;
    if (inFile.is_open()) {
        while (getline(inFile, l[i])) {
            cout << ".";
            i++;
            n = i;
        }
        cout << f << "读取成功！" << endl << endl;
    } else {
        cerr << "Unable to open file";
    }
}

void File_write(string f, string* l, int n) {
    ofstream outFile(f.c_str());
    if (outFile.is_open()) {
        for (int i = 0; i < n; i++) {
            outFile << l[i] << endl;
        }
        cout << f << "写入成功！" << endl << endl;
    }
}

// 遍历数据表
void Check(string* l, int& n) {
    cout << "—·—·—·—·—·—·—·—·—·—·—·—·—·—·—·—·—" << endl;
    for (int i = 0; i < n; i++) {
        cout << "|" << i << "\t" << l[i] << "\t|" << endl;
    }
    cout << "—·—·—·—·—·—·—·—·—·—·—·—·—·—·—·—·—" << endl;
    cout << endl;
}

void Del(string* l, int n, int i) {
    for (int num = i; num < n; num++) {
        l[num] = l[num + 1];
    }
}

// 并运算
void Merge(string* l1, int& n1, string* l2, int& n2, int& out_num) {
    if (l1[0] != l2[0]) {
        cout << "两张数据表属性不一致！";
    } else {
        out[0] = l1[0];
        int x = 1;
        for (int i = 1; i < n1; i++) {
            out[i] = l1[i];
            x = i;
        }
        for (int i = 1; i <= x; i++) {
            for (int j = 1; j < n2; j++) {
                if (out[i] == l2[j]) {
                    Del(out, x, i);
                    x--;
                }
            }
        }
        out_num = x + n2 - 1;
        int p = 1;
        for (int i = x; i < x + n2; i++) {
            out[i] = l2[p];
            p++;
        }
    }
}

void intersection(string* l1, int& n1, string* l2, int& n2, int& out_num) {
    if (l1[0] != l2[0]) {
        cout << "两张数据表属性不一致！";
    } else {
        out[0] = l1[0];
        int x = 1;
        for (int i = 1; i < n1; i++) {
            for (int j = 1; j < n2; j++) {
                if (l1[i] == l2[j]) {
                    out[x] = l1[i];
                    x++;
                }
            }
        }
        out_num = x - 1;
    }
}

void difference(string* l1, int& n1, string* l2, int& n2, int& out_num) {
    if (l1[0] != l2[0]) {
        cout << "两张数据表属性不一致！";
    } else {
        out[0] = l1[0]; // 复制表头
        int x = 1;
        for (int i = 1; i < n1; i++) {
            bool found = false;
            for (int j = 1; j < n2; j++) {
                if (l1[i] == l2[j]) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                out[x] = l1[i];
                x++;
            }
        }
        out_num = x;
    }
}

// 笛卡尔积
void cartesianProduct(string* l1, int& n1, string* l2, int& n2, int& out_num) {
    if (l1[0] != l2[0]) {
        cout << "两张数据表属性不一致！";
    } else {
        out[0] = l1[0] + "\t" + l2[0]; // 合并表头
        int x = 1;
        for (int i = 1; i < n1; i++) {
            for (int j = 1; j < n2; j++) {
                out[x] = l1[i] + "\t" + l2[j]; // 合并行
                x++;
            }
        }
        out_num = x;
    }
}

// 封装核心操作函数，以便从 JavaScript 调用
extern "C" {
    void performMerge() {
        int out_num = 0;
        Merge(l1, n1, l2, n2, out_num);
    }

    void performIntersection() {
        int out_num = 0;
        intersection(l1, n1, l2, n2, out_num);
    }

    void performDifference() {
        int out_num = 0;
        difference(l1, n1, l2, n2, out_num);
    }

    void performCartesianProduct() {
        int out_num = 0;
        cartesianProduct(l1, n1, l2, n2, out_num);
    }

    void readFiles() {
        string f1 = "t1.txt", f2 = "t2.txt";
        File_read(f1, l1, n1);
        File_read(f2, l2, n2);
    }

    void writeResult() {
        int out_num = 0;
        // 这里需要根据具体情况计算 out_num
        File_write("out.txt", out, out_num);
    }
}

int main() {
    system("CHCP 65001 > nul");
    string f1 = "t1.txt", f2 = "t2.txt";
    // cin>>f1>>f2;
    // f1=f1+".txt";
    // f2=f2+".txt";
    // File_create(f1);
    // File_create(f2);
    File_read(f1, l1, n1);
    File_read(f2, l2, n2);
    Check(l1, n1);
    Check(l2, n2);
    int out_num = 0;
    int opt;
    while (1) {
        cout << "====Menu=================" << endl;
        cout << "|请选择关系运算操作：\t|" << endl;
        cout << "|1.进行并运算\t\t|" << endl;
        cout << "|2.进行交运算\t\t|" << endl;
        cout << "|3.进行差运算\t\t|" << endl;
        cout << "|4.进行笛卡尔积运算\t|" << endl;
        cout << "|5.将上次结果写入文件\t|" << endl;
        cout << "|0.退出操作\t\t|" << endl;
        cout << "=========================" << endl;
        cin >> opt;
        switch (opt) {
            case 0:
                return 0;
            case 1:
                Merge(l1, n1, l2, n2, out_num);
                Check(out, out_num);
                break;
            case 2:
                intersection(l1, n1, l2, n2, out_num);
                Check(out, out_num);
                break;
            case 3:
                difference(l1, n1, l2, n2, out_num);
                Check(out, out_num);
                break;
            case 4:
                cartesianProduct(l1, n1, l2, n2, out_num);
                Check(out, out_num);
                break;
            case 5:
                Check(out, out_num);
                File_write("out.txt", out, out_num);
                break;
            default:
                cout << "输入有误！";
                break;
        }
    }

    return 0;
}
